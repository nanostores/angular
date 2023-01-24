# Nano Stores Angular

<img align="right" width="92" height="92" title="Nano Stores logo"
     src="https://nanostores.github.io/nanostores/logo.svg">

Angular integration for **[Nano Stores]**, a tiny state manager
with many atomic tree-shakable stores.

## Install

```sh
npm install @nanostores/angular
```

## How to use

```ts
// your NgModule:
import { NANOSTORES, NanostoresService } from '@nanostores/angular';

@NgModule({ providers: [{ provide: NANOSTORES, useClass: NanostoresService }], ... })
export class AppModule { }

// Store example
import { atom } from 'nanostores';

// State structure
export type Fruit = {
  name: string;
  cost: number;
}

export const fruits = atom<Fruit[]>([]);
```

**app.component.ts:**

```tsx
// example using async pipes:
import { Component } from "@angular/core";
import { NanostoresService } from "@nanostores/angular";

import { Fruit, fruits } from "../stores/fruits";

@Component({
  selector: "app-root",
  template:
    '<p *ngFor="let fruit of fruits$ | async">{{ fruit.name }}: {{ fruit.cost }}$</p>',
})
export class AppComponent {
  fruits$ = this.nanostores.useStore(fruits);

  constructor(private nanostores: NanostoresService<Fruit[]>) {}
}
```

```tsx
// example without async pipes:
import { Component, OnInit } from "@angular/core";
import { NanostoresService } from "@nanostores/angular";

import { Fruit, fruits } from "../stores/fruits";

@Component({
  selector: "app-root",
  template: '<p *ngFor="let line of lines">{{ line }}</p>',
})
export class AppComponent implements OnInit {
  fruits$ = this.nanostores.useStore(fruits);
  lines: string[] = [];

  constructor(private nanostores: NanostoresService<Fruit[]>) {}

  ngOnInit() {
    this.fruits$.subscribe(
      (fruits) =>
        (this.lines = fruits.map((fruit) => `${fruit.name}: ${fruit.cost}$`))
    );
  }
}
```

[nano stores]: https://github.com/nanostores/nanostores/

<a href="https://evilmartians.com/?utm_source=nanostores">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>
