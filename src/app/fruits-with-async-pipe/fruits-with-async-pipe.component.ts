import { Component } from '@angular/core';
import { NanostoresService } from '../../../projects/ng-nanostores/src';
import { Fruit, fruits } from '../stores/fruits';

@Component({
  selector: 'fruits-with-async-pipe',
  templateUrl: './fruits-with-async-pipe.component.html'
})
export class FruitsWithAsyncPipeComponent {
  fruits$ = this.nanostores.useStore('fruits', fruits);

  constructor(private nanostores: NanostoresService<Fruit[]>) { }

  addApple() {
    const apple = {
      name: 'Apple',
      cost: 3
    }
    fruits.set([...fruits.get(), apple])
  }
}
