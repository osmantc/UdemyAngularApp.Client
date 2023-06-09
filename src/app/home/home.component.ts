import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers() {
    this.httpClient.get('http://localhost:5000/api/user').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
    });
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
