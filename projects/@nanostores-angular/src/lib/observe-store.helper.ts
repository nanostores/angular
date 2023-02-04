import { Observable } from "rxjs";
import { Store } from "nanostores";

export function observeStore<T>(store: Store<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
        let lastValue: T = store.get();
        subscriber.next(lastValue);
        return store.subscribe((value) => {
            if (value !== lastValue) {
                lastValue = value;
                subscriber.next(value);
            }
        });
    });
}
