import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
      this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      })
  }

  onLogout() {
      this.authService.logout();
      this.router.navigate(['/']);
  }
}
