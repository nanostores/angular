import { NgModule } from "@angular/core";
import { NanostoresPipe } from "./nanostores.pipe";

@NgModule({
    declarations: [NanostoresPipe],
    exports: [NanostoresPipe],
}) export class NanostoresModule {}