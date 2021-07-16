import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatpostComponent } from './creatpost.component';

describe('CreatpostComponent', () => {
  let component: CreatpostComponent;
  let fixture: ComponentFixture<CreatpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
