import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidUser!: boolean;

  constructor(private router:Router, private http: HttpClient) { }

    ngOnInit(): void {
    }

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    console.log(credentials);
    this.http.post("http://localhost:9999/api/account/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidUser = false;
      this.router.navigate(["/welcome"]);
    }, err => {
      this.invalidUser = true;
    });
  }
}



