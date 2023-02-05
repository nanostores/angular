import { Component } from '@angular/core';
import { computed } from "nanostores";
import { User } from '../stores/user';
import { profile } from '../stores/profile';

@Component({
  selector: 'app-current-user-async-pipe',
  template: `
    <p *ngIf="(getUser(userId | stored) | stored) as user">{{ user.name }}</p>
    <div>{{ profile | stored | json }}</div>
  `
})
export class CurrentUserAsyncPipeComponent {

  profile = profile;

  userId = computed(profile, ({ userId }) => userId)

  constructor() {
    setInterval(() => {
      profile.set({ userId: Math.random().toString(), name: 'John' });
    }, 1000);
  }

  getUser(userId: string) {
    return User(userId);
  }
}
