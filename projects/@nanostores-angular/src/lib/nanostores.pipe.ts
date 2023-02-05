import { ChangeDetectorRef, Pipe, PipeTransform } from "@angular/core";
import { Store } from "nanostores";
import { AsyncPipe } from "@angular/common";
import { observeStore } from "./observe-store.helper";
import { Observable } from "rxjs";

@Pipe({
    name: 'stored',
    pure: false,
}) export class NanostoresPipe<T> implements PipeTransform, Omit<AsyncPipe, 'transform'> {
    private asyncPipe: AsyncPipe;
    private lastValue: Observable<T> | null = null;
    private lastStore: Store<T> | null = null;

    constructor(ref: ChangeDetectorRef) {
        this.asyncPipe = new AsyncPipe(ref);
    }

    transform(store: Store<T> | null | undefined): T | null {
        if (!store) {
            this.lastValue = null;
            this.lastValue = null;
            return null;
        }

        if (this.lastStore !== store) {
            this.lastStore = store;
            this.lastValue = observeStore<T>(store);
        }

        return this.asyncPipe.transform(this.lastValue);
    }

    ngOnDestroy(): void {
        this.asyncPipe.ngOnDestroy();
    }
}
