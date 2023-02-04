import { Component, OnInit } from '@angular/core';
import { observeStore } from '@nanostores/angular';
import { switchMap } from 'rxjs';
import { User } from '../stores/user';
import { profile } from '../stores/profile';

@Component({
  selector: 'app-current-user',
  template: '<p>{{ text }}</p>'
})
export class CurrentUserComponent implements OnInit {
  text = '';

  ngOnInit() {
    observeStore(profile).pipe(
      switchMap(({ userId }) => observeStore(User(userId)))
    )
    .subscribe(user => this.text = `User name is ${user.name}`);
  }
}
