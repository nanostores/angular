import { ComponentFixture, TestBed } from '@angular/core/testing';
import { atom } from 'nanostores';
import { Component } from "@angular/core";
import { NanostoresModule } from "./nanostores.module";

const store = atom<string>('old state');

@Component({
  template: `<h1>{{ store | stored }}</h1>`
}) class DummyComponent {
  store = store;
}

describe('NanostoresPipe', () => {
  let component: DummyComponent;
  let fixture: ComponentFixture<DummyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NanostoresModule],
      declarations: [DummyComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show stored value',  () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.innerHTML).toBe('old state');
  });
});
