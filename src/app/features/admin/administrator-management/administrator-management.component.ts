import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {Users} from '../../../core/models/Users';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-administrator-management',
  templateUrl: './administrator-management.component.html',
  styleUrl: './administrator-management.component.scss'
})
export class AdministratorManagementComponent implements OnInit {
  users$!: Observable<Users[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getAllUsers();
  }

  promoteUser(userId: string): void{
    this.userService.promoteToAdmin(userId).subscribe(() => {
      this.users$ = this.userService.getAllUsers();
    });
  }


}
