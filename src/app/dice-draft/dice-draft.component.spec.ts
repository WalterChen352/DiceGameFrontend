import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceDraftComponent } from './dice-draft.component';

describe('DiceDraftComponent', () => {
  let component: DiceDraftComponent;
  let fixture: ComponentFixture<DiceDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceDraftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
