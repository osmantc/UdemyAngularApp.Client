import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  // loggedIn: boolean = false;

  constructor(
    public accountService: AccountService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    // this.getCurrentUser();
  }

  //bu şimdilik mantığı görmek için böyle. bunun yerine bu kadar yazmaya uğraşmadan en iyisi async-pipe kullanımı, daha pratik.
  //asnyc pipe kullanmaya geçtiğimiz için bu logic iptal.

  // getCurrentUser() {
  //   this.accountService.currentUser$.subscribe({
  //     next: (user) => {
  //       this.loggedIn = !!user;
  //       this.model.username = user?.username;
  //     }, // veya this.loggedIn = user !== null
  //     error: (error) => console.log(error),
  //   });
  // }

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        // this.loggedIn = true; //async pipeden dolayı bu mantık iptal oldu.
      }
      // , //FIXME: fixed; artık central error logic (interceptor kullandığımızdan ayrı ayrı error handlinge gerek yok)
      // error: (error) => {
      //   this.toast.error(error.error, 'Bir Hata Oluştu');
      //   console.log(error);
      // },
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
    // this.loggedIn = false;
  }
}
