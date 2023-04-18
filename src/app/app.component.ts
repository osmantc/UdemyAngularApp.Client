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

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
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
