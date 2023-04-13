import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(
    private client: HttpClient,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers() {
    this.client
      .get('http://localhost:5000/api/user')
      .subscribe((next) => (this.users = next));
  }

  //kullanıcı browseri açtığında/yani bizim app'i; localStorage'de varsa mevcut credentials'i alsın ve account servisimizdeki
  //user info tutan behaviorSubjectimize işlesin.
  setCurrentUser(): void {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }
}
