# Nano Stores Angular

<img align="right" width="92" height="92" title="Nano Stores logo"
     src="https://nanostores.github.io/nanostores/logo.svg">

Angular integration for **[Nano Stores]**, a tiny state manager
with many atomic tree-shakable stores.

## How to install

```sh
pnpm add @nanostores/angular # or npm or yarn
```

## How to use

```ts
// your NgModule:
import { NANOSTORES, NanostoresService } from '@nanostores/angular';

@NgModule({ providers: [{ provide: NANOSTORES, useClass: NanostoresService }], ... })
```

**app.component.ts:**

```tsx
// example using async pipes:
import { Component } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { Observable, switchMap } from 'rxjs';

import { profile } from '../stores/profile';
import { IUser, User } from '../stores/user';

@Component({
  selector: "app-root",
  template: '<p *ngIf="(currentUser$ | async) as user">{{ user.name }}</p>'
})
export class AppComponent {
  currentUser$: Observable<IUser> = this.nanostores.useStore(profile)
    .pipe(switchMap(({ userId }) => this.nanostores.useStore(User(userId))));

  constructor(private nanostores: NanostoresService) { }
}
```

```tsx
// example without async pipes:
import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { switchMap } from 'rxjs';

import { profile } from '../stores/profile';
import { User } from '../stores/user';

@Component({
  selector: "app-root",
  template: '<p>{{ text }}</p>'
})
export class AppComponent implements OnInit {
  text = '';

  constructor(private nanostores: NanostoresService) { }

  ngOnInit() {
    this.nanostores.useStore(profile).pipe(
      switchMap(({ userId }) => this.nanostores.useStore(User(userId)))
    )
    .subscribe(user => this.text = `User name is ${user.name}`);
  }
}
```

[nano stores]: https://github.com/nanostores/nanostores/

<a href="https://evilmartians.com/?utm_source=nanostores">
  <img src="https://evilmartians.com/badges/sponsored-by-evil-martians.svg"
       alt="Sponsored by Evil Martians" width="236" height="54">
</a>
