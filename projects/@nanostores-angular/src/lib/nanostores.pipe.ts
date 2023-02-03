import {ChangeDetectorRef, OnDestroy, Pipe, PipeTransform} from "@angular/core";
import { Store } from "nanostores";

@Pipe({
    name: 'stored',
    pure: false,
}) export class NanostoresPipe<T> implements PipeTransform, OnDestroy {
    private ref: ChangeDetectorRef | null = null;
    private latestValue: T | null = null;
    private unbind: (() => void) | null = null;

    private store: Store<T> | null = null;

    constructor(ref: ChangeDetectorRef) {
        // Assign `ref` into `this.ref` manually instead of declaring `private ref` in the constructor
        // parameter list, as the type of `this.ref` includes `null` unlike the type of `ref`.
        this.ref = ref;
    }

    ngOnDestroy(): void {
        if (this.unbind) {
            this.dispose();
        }
        // Clear the `ChangeDetectorRef` and its association with the view data, to mitigate
        // potential memory leaks in Observables that could otherwise cause the view data to
        // be retained.
        // https://github.com/angular/angular/issues/17624
        this.ref = null;
    }

    transform(store: Store<T> | null | undefined): T | null {
        if (!this.store) {
            if (store) {
                this.unbind = store.subscribe((value) => {
                    this.latestValue = value;
                    // Note: `this.ref` is only cleared in `ngOnDestroy` so is known to be available when a
                    // value is being updated.
                    this.ref!.markForCheck();
                });
            }
            return this.latestValue;
        }

        if (store !== this.store) {
            this.dispose();
            return this.transform(store);
        }

        return this.latestValue;
    }

    private dispose(): void {
        this.latestValue = null;
        this.store = null;
        this.unbind?.();
        this.unbind = null;
    }
}