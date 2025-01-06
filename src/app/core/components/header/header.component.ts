import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Users} from '../../models/Users';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  isLoggedIn!: boolean;
  user!: Users;
  isAdmin: boolean = false;
  showDropdownAdmin: boolean = false;
  showDropdownUser: boolean = false;

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private el: ElementRef) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      if(this.authService.isAuthenticated()) {
        this.userService.loadCurrentUser().subscribe();
      }
      this.isAdmin = this.authService.isAdmin();
      this.showDropdownUser = false;  // Reset du menu utilisateur lors de la connexion
      this.showDropdownAdmin = false;
    })
    this.userService.user$.subscribe(user => {
      if(user){
        this.user = user;
        this.user.profilePicturePath = null ? user.profilePicturePath : "basic-profile-picture.webp";
      }
    })
  }
  toggleUserDropdown() {
    this.showDropdownUser = !this.showDropdownUser;
    this.showDropdownAdmin = false;
  }

  toggleAdminDropdown() {
    this.showDropdownAdmin = !this.showDropdownAdmin;
    this.showDropdownUser = false;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.showDropdownUser = false;
      this.showDropdownAdmin = false;
    }
  }
}
