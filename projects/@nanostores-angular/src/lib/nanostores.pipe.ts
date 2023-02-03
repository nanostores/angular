import { ChangeDetectorRef, Pipe, PipeTransform } from "@angular/core";
import { Store } from "nanostores";
import { AsyncPipe } from "@angular/common";
import {observeStore} from "./observe-store.helper";

@Pipe({
    name: 'stored',
    pure: false,
}) export class NanostoresPipe<T> implements PipeTransform, Omit<AsyncPipe, 'transform'> {
    asyncPipe: AsyncPipe;

    constructor(ref: ChangeDetectorRef) {
        this.asyncPipe = new AsyncPipe(ref);
    }

    transform(store: Store<T> | null | undefined): T | null {
        return this.asyncPipe.transform(store ? observeStore<T>(store) : null);
    }

    ngOnDestroy(): void {
        this.asyncPipe.ngOnDestroy();
    }
}