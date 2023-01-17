import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '../../../projects/ng-nanostores/src';
import { counter } from '../stores/counter';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  counter$ = this.nanostores.useStore('counter', counter);
  text: string = 'Total: ';

  constructor(private nanostores: NanostoresService<number>) { }

  ngOnInit() {
    this.counter$.subscribe(value => this.text = `Total: ${value}`);
  }

  increment() {
    counter.set(counter.get() + 1)
  }
}
