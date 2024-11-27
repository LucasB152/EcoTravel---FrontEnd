import {Component, OnInit} from '@angular/core';
import {TokenService} from '../core/services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../core/services/auth.service';
import {response} from 'express';
import {Users} from '../core/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
       if(this.tokenService.getUserInfo() != null){
         let email: string = this.tokenService.getUserInfo().sub;
          this.authService.getUser(email).subscribe(response =>
            console.log(response)
          );
       }else{
         this.router.navigate(['/login']);
       }
    }

  editProfile() {

  }
}
