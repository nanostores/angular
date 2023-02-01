import { Component } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { fruits } from './stores/fruits';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fruits$ = this.nanostores.useStore(fruits);

  constructor(private nanostores: NanostoresService<number>) { }

  addOrange() {
    const orange = {
      name: 'Orange',
      cost: 1
    }
    fruits.set([...fruits.get(), orange])
  }
}
