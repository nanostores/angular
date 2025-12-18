import { Component } from "@angular/core";
import { NANOSTORES, NanostoresService } from "@nanostores/angular";
import { CurrentUserAsyncPipeComponent } from "./current-user-async-pipe/current-user-async-pipe.component";
import { CurrentUserComponent } from "./current-user/current-user.component";

@Component({
  selector: "app-root",
  imports: [CurrentUserComponent, CurrentUserAsyncPipeComponent],
  providers: [{ provide: NANOSTORES, useClass: NanostoresService }],
  templateUrl: "./app.html",
  standalone: true,
})
export class App {}
