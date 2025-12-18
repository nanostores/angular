import { Component, inject, OnInit } from "@angular/core";
import { NanostoresService } from "@nanostores/angular";
import { switchMap } from "rxjs";
import { profile } from "../stores/profile";
import { User } from "../stores/user";

@Component({
  selector: "app-current-user",
  template: "<p>{{ text }}</p>",
  standalone: true,
})
export class CurrentUserComponent implements OnInit {
  private nanostores = inject(NanostoresService);
  text = "";

  ngOnInit() {
    this.nanostores
      .useStore(profile)
      .pipe(switchMap(({ userId }) => this.nanostores.useStore(User(userId))))
      .subscribe((user) => (this.text = `User name is ${user.name}`));
  }
}
