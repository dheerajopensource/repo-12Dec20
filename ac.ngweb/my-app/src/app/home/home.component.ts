import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  isUserAuthenticated(){
    const token: string = JSON.parse(localStorage.getItem("jwt") || '{}');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    this.router.navigate(["/login"]);
    
    return false;
    
  }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem("jwt");
 }

}
