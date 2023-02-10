import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, finalize, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Store } from 'nanostores';

@Injectable({
  providedIn: 'root'
})
export class NanostoresService implements OnDestroy {
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  /**
  * @param store Store instance.
  * @returns Observable that contains current Store value.
  */
  useStore<T>(store: Store<T>): Observable<T> {
    const state$ = new BehaviorSubject(store.get());
    const unbind = store.subscribe(value => {
      state$.next(value);
    });
    return state$.pipe(
      distinctUntilChanged(),
      finalize(unbind),
      takeUntil(this.destroyed$)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
