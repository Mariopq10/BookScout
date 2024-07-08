import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoLibroPage } from './info-libro.page';

describe('InfoLibroPage', () => {
  let component: InfoLibroPage;
  let fixture: ComponentFixture<InfoLibroPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLibroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
