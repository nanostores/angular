import { TestBed } from '@angular/core/testing';
import { Store } from 'nanostores';

import { NanostoresService } from './nanostores.service';
import { NANOSTORES } from './nanostores.token';

let mockState: { value: string } = { value: 'old state' };

let mockStore: Partial<Store<typeof mockState>> = {
  get: () => mockState,
  set: jasmine.createSpy('set').and.callFake((value) => {
    mockState = value;
  }),
  subscribe: jasmine.createSpy('subscribe').and.callFake(fn => {
    fn(mockState);
  }),
};

describe('NanostoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: NANOSTORES, useClass: NanostoresService, useValue: mockStore }
    ]
  }));

  it('should get state observable by property key', (done) => {
    const service: NanostoresService = TestBed.get(NanostoresService);
    const name$ = service.useStore(mockStore as Store);

    name$.subscribe(value => {
      expect(value).toEqual(mockState);
      done();
    });
  });

  it('should set state by property key', (done) => {
    const service: NanostoresService = TestBed.get(NanostoresService);
    const changedState = { value: 'new state' };

    // @ts-expect-error
    mockStore.set(changedState);

    service.useStore(mockStore as Store).subscribe(res => {
      expect(res.value).toEqual(changedState.value);
      done();
    });
  });
});
