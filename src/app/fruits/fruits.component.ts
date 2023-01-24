import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { Fruit, fruits } from '../stores/fruits';

@Component({
  selector: 'fruits',
  templateUrl: './fruits.component.html'
})
export class FruitsComponent implements OnInit {
  fruits$ = this.nanostores.useStore(fruits);
  texts: string[] = [];

  constructor(private nanostores: NanostoresService<Fruit[]>) { }

  ngOnInit() {
    this.fruits$.subscribe(fruits => this.texts = fruits.map(fruit => `Fruit ${fruit.name} costs ${fruit.cost}$`));
  }

  addBanana() {
    const banana = {
      name: 'Banana',
      cost: 8
    }
    fruits.set([...fruits.get(), banana])
  }
}
