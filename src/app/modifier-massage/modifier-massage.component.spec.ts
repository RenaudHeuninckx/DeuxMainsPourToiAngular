import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMassageComponent } from './modifier-massage.component';

describe('ModifierMassageComponent', () => {
  let component: ModifierMassageComponent;
  let fixture: ComponentFixture<ModifierMassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
