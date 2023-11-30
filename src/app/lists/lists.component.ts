import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent {
  constructor(private accountService: AccountService) {}

  callServerError() {
    this.accountService.callServerError().subscribe({
      next: () => {}
    });
  }
}
