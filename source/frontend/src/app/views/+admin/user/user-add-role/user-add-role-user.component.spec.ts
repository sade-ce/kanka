import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddRoleUserComponent } from './user-add-role-user.component';

describe('UserAddRoleUserComponent', () => {
  let component: UserAddRoleUserComponent;
  let fixture: ComponentFixture<UserAddRoleUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddRoleUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddRoleUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
