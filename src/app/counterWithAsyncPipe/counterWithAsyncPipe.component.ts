import { Component } from '@angular/core';
import { NanostoresService } from '../../../projects/ng-nanostores/src';
import { counter } from '../stores/counter';

@Component({
  selector: 'counter-with-async-pipe',
  templateUrl: './counterWithAsyncPipe.component.html'
})
export class CounterWithAsyncPipe {
  counter$ = this.nanostores.useStore('counter', counter);

  constructor(private nanostores: NanostoresService<number>) { }

  increment() {
    counter.set(counter.get() + 1)
  }
}
