import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceContainerComponent } from './diceContainer.component';

describe('DiceComponent', () => {
  let component: DiceContainerComponent;
  let fixture: ComponentFixture<DiceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
