import { atom, WritableAtom } from 'nanostores';
import { observeStore } from "./observe-store.helper";

describe('NanostoresPipe', () => {
    let store: WritableAtom<string>;

    beforeEach(() => {
        store = atom<string>('old state');
    });

    it('should get initial value', (done) => {
        observeStore(store).subscribe({
            next: (value) => {
                expect(value).toBe('old state');
                done();
            },
            error: done.fail,
        });
    });

    it('should watch changes', () => {
        const next = jasmine.createSpy('calls');
        observeStore(store).subscribe(next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith('old state');
        store.set('new state');
        expect(next).toHaveBeenCalledTimes(2);
        expect(next).toHaveBeenCalledWith('new state');
    });
});
