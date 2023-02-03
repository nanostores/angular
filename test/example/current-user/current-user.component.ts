import { Component, OnInit } from '@angular/core';
import { observeStore } from '@nanostores/angular';
import { User } from '../stores/user';
import { profile } from '../stores/profile';
import { switchMap } from 'rxjs';

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
