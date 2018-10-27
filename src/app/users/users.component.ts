import { Component, OnInit } from '@angular/core';
import {User} from '../user'
import { UserService } from '../user.service';
import { Address } from '../address';
import { Company } from '../company';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }
 
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    let temp = new User(Math.max(...this.users.map(user => user.id)) + 1, name, "", "", new Address("","","","",[0,0]), "","", new Company("","",""));
    this.userService.addUser(temp)
      .subscribe(user => {
        this.users.push(user);
      });
  }
 
  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

}
