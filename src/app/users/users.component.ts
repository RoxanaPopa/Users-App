import { Component, OnInit } from '@angular/core';
import {User} from '../user'
import { Company } from '../company';
import { Address } from '../address';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user = new User(
    1, 
    "Leanne Graham", 
    "Bret",  
    "Sincere@april.biz",
    new Address(
      "Kulas Light",
      "Apt. 556",
      "Gwenborough",
      "92998-3874",
      [-37.3159, 81.1496]
  ),
    "1-770-736-8031 x56442",
    "hildegard.org",
    new Company("Romaguera-Crona", "Multi-layered client-server neural-net", "harness real-time e-markets")
  );

  constructor() { }

  ngOnInit() {
  }

}
