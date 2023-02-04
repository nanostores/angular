import { Component } from '@angular/core';
import { computed } from "nanostores";
import { User } from '../stores/user';
import { profile } from '../stores/profile';

@Component({
  selector: 'app-current-user-async-pipe',
  template: '<p *ngIf="(getUser(userId | stored) | stored) as user">{{ user.name }}</p>'
})
export class CurrentUserAsyncPipeComponent {

  userId = computed(profile, ({ userId }) => userId)

  getUser(userId: string) {
    return User(userId);
  }
}
