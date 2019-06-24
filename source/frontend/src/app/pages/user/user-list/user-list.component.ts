import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {



  ngOnInit() {
  }

  refresh() {
    this.userService.getAll().subscribe((users) => {
      this.source.load(users);
    });
  }

}
