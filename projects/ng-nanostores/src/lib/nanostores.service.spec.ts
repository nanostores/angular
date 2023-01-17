import { TestBed } from '@angular/core/testing';
import { Store } from 'nanostores';

import { NanostoresService } from './nanostores.service';
import { NANOSTORES } from './nanostores.token';

let mockState: string = 'a';

let mockStore: Partial<Store<typeof mockState>> = {
  get: () => mockState,
  set: jasmine.createSpy('set').and.callFake((event, callback) => {
    callback(mockState);
  }),
};

describe('NanostoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: NANOSTORES, useValue: mockStore }
    ]
  }));

  it('should return state observable by property key', (done) => {
    const service: NanostoresService<typeof mockState> = TestBed.get(NanostoresService);
    const name$ = service.useStore('testName', mockStore as Store);

    name$.subscribe(value => {
      expect(value).toEqual(mockState);
      done();
    });
  });

  it('should change state observable by property key', (done) => {
    const service: NanostoresService<typeof mockState> = TestBed.get(NanostoresService);
    const name$ = service.useStore('testName', mockStore as Store);
    // @ts-ignore
    mockStore.set('ab');

    name$.subscribe(value => {
      expect(value).toEqual(mockState);
      done();
    });
  });
});
