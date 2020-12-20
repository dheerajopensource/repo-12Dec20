import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  message:any;
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/account", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      this.message = response;
      console.log(this.message);
    }, err => {
      console.log(err)
    });
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.router.navigate(['/']);
 }
}