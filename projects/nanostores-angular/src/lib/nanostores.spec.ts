import { Store } from "nanostores";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NanostoresService } from "./nanostores.service";

let mockState: { value: string } = { value: "old state" };

let mockStore: Partial<Store<typeof mockState>> = {
  get: () => mockState,
  set: vi.fn((value) => {
    mockState = value;
  }),
  subscribe: vi.fn((fn) => {
    fn(mockState);
    return () => {};
  }),
};

describe("NanostoresService", () => {
  let service: NanostoresService;

  beforeEach(() => {
    service = new NanostoresService();
  });

  it("should get state observable by property key", async () => {
    const name$ = service.useStore(mockStore as Store);
    let value;
    const promise = new Promise((resolve) => {
      name$.subscribe((v) => {
        value = v;
        resolve(undefined);
      });
    });
    await promise;
    expect(value).toEqual(mockState);
  });

  it("should set state by property key", async () => {
    const changedState = { value: "new state" };
    // @ts-expect-error
    mockStore.set(changedState);
    const name$ = service.useStore(mockStore as Store);
    let res: any;
    const promise = new Promise((resolve) => {
      name$.subscribe((v) => {
        res = v;
        resolve(undefined);
      });
    });
    await promise;

    if (res) expect(res.value).toEqual(changedState.value);
  });
});
