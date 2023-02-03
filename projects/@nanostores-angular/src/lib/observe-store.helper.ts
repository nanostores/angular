import { Observable } from "rxjs";
import { Store } from "nanostores";

export function observeStore<T>(store: Store<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        return store.subscribe((value) => {
            subscriber.next(value);
        });
    });
}