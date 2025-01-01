import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'app-administrator-management',
  templateUrl: './administrator-management.component.html',
  styleUrl: './administrator-management.component.scss'
})
export class AdministratorManagementComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
        this.userService.getAllUsers().subscribe(
          response => {
            console.log(response);
          }, error => {
            console.log(error);
          }
        )
    }


}
