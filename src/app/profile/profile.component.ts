import { Component, OnInit } from '@angular/core';
import { NanostoresService } from '@nanostores/angular';
import { profile, ProfileValue } from '../stores/profile';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profile$ = this.nanostores.useStore(profile);
  text: string = '';

  constructor(private nanostores: NanostoresService<ProfileValue>) { }

  ngOnInit() {
    this.profile$.subscribe(profile => this.text = `Profile name is: ${profile.name}` );
  }

  changeName() {
    profile.setKey('name', profile.get().name + 's')
  }
}
