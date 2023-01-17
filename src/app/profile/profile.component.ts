import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '../../../projects/ng-nanostores/src';
import { profile, ProfileValue } from '../stores/profile';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile$ = this.nanostores.useStore('profile', profile);
  text: string = '';

  constructor(private nanostores: NanostoresService<ProfileValue>) { }

  ngOnInit() {
    this.profile$.subscribe(profile => this.text = `Profile name is: ${profile.name}` );
  }

  changeName() {
    profile.setKey('name', profile.get().name + 's')
  }
}
