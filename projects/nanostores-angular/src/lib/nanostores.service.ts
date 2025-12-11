import { Injectable, OnDestroy } from '@angular/core';
import { Store } from 'nanostores';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NanostoresService implements OnDestroy {
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  /**
   * @param store Store instance.
   * @returns Observable that contains current Store value.
   */
  useStore<T>(store: Store<T>): Observable<T> {
    return new Observable<T>((sub) => {
      sub.next(store.get());
      return store.subscribe((value) => sub.next(value));
    }).pipe(distinctUntilChanged(), takeUntil(this.destroyed$));
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
