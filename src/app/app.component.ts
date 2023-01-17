import { Component } from '@angular/core';
import { NanostoresService } from '../../projects/ng-nanostores/src';
import { counter } from './stores/counter';
import { fruits } from './stores/fruits';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter$ = this.nanostores.useStore('counter', counter);
  fruits$ = this.nanostores.useStore('fruits', fruits);

  constructor(private nanostores: NanostoresService<number>) { }

  increment() {
    counter.set(counter.get() + 1)
  }

  addOrange() {
    const orange = {
      name: 'Orange',
      cost: 5
    }
    fruits.set([...fruits.get(), orange])
  }
}
