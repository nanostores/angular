import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject,  Observable, ReplaySubject,  } from 'rxjs';
import { distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Store } from 'nanostores';

@Injectable({
  providedIn: 'root'
})
export class NanostoresService<T> implements OnDestroy {
  private unbind: () => void = () => {};
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  /** 
  * @param store Store instance.
  * @returns Observable that contains current Store value.
  */
  useStore(store: Store): Observable<T> {
    let state$ = new BehaviorSubject<T>(store.get());
    this.unbind = store.subscribe(value => {
      state$.next(value);
    });
    return state$.pipe(
      map(state => state),
      distinctUntilChanged(),
      takeUntil(this.destroyed$)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.unbind();
  }
}
