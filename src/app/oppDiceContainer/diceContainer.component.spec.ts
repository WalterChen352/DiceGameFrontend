import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OppDiceContainerComponent } from './diceContainer.component';

describe('DiceComponent', () => {
  let component: OppDiceContainerComponent;
  let fixture: ComponentFixture<OppDiceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OppDiceContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OppDiceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
