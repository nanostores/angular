import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { switchMap } from 'rxjs';

import { profile } from '../stores/profile';
import { User } from '../stores/user';

@Component({
  selector: 'current-user',
  template: '<p>{{ text }}</p>'
})
export class CurrentUserComponent implements OnInit {
  text = '';

  constructor(private nanostores: NanostoresService) { }

  ngOnInit() {
    this.nanostores.useStore(profile).pipe(
      switchMap((userId: string) => this.nanostores.useStore(User(userId)))
    )
    .subscribe(user => this.text = `User name is ${user.name}`);
  }
}
