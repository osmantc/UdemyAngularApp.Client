import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(private client: HttpClient) {}

  ngOnInit(): void {
    this.client
      .get('http://localhost:5000/api/user')
      .subscribe((next) => (this.users = next));
  }
}
