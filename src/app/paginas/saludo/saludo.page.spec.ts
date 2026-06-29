import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaludoPage } from './saludo.page';

describe('SaludoPage', () => {
  let component: SaludoPage;
  let fixture: ComponentFixture<SaludoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
