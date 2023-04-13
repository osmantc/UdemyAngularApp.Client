import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  //bu şimdilik mantığı görmek için böyle. bunun yerine bu kadar yazmaya uğraşmadan en iyisi async-pipe kullanımı, daha pratik.
  getCurrentUser() {
    this.accountService.currentUser$.subscribe({
      next: (user) => {
        this.loggedIn = !!user;
        this.model.username = user?.username;
      }, // veya this.loggedIn = user !== null
      error: (error) => console.log(error),
    });
  }

  login() {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  logout() {
    this.accountService.logout();
    this.loggedIn = false;
  }
}
