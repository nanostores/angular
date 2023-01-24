import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { counter } from '../stores/counter';
import { filteredFruits } from '../stores/filteredFruits';
import { Fruit, fruits } from '../stores/fruits';

@Component({
  selector: 'filtered-fruits',
  templateUrl: './filtered-fruits.component.html'
})
export class FilteredFruitsComponent implements OnInit {
  filteredFruits$ = this.nanostores.useStore(filteredFruits);
  texts: string[] = [];

  constructor(private nanostores: NanostoresService<Fruit[]>) { }

  ngOnInit() {
    this.filteredFruits$.subscribe(
      fruits => this.texts = fruits.map(fruit => `Fruit ${fruit.name} cost ${fruit.cost}$ and it is more than ${counter.get()}$`)
    );
  }

  addPineapple() {
    const pineApple = {
      name: 'PineApple',
      cost: 12
    }
    fruits.set([...fruits.get(), pineApple])
  }
}
