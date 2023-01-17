import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, ReplaySubject, takeUntil } from 'rxjs';
import { Store } from 'nanostores';

@Injectable({
  providedIn: 'root'
})
export class NanostoresService<T> implements OnDestroy {
  private unbind: () => void = () => {};
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  useStore(key: string, store: Store): Observable<T> {
    let state$ = new BehaviorSubject<{key: string, value: T}>({key: key, value: store.get()});
    this.unbind = store.subscribe(value => {
      state$.next({key: key, value: value});
    });
    return state$.pipe(
      filter(state => state?.key === key),
      map(state => state?.value),
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
