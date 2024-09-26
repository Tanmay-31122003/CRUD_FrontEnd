import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import User from '../types/user';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userService = inject(UserService);

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    console.log(this.users)
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }

  delete(id?: string) {
    if (!id) {
      console.error('User ID is undefined');
      return;
    }
    
    const ok = confirm("Are you sure you want to delete this user?");
    if (ok) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert("User deleted successfully.");
          this.users = this.users.filter(u => u._id !== id);
        },
        error: (err) => {
          alert("Failed to delete user.");
          console.error(err);
        }
      });
    }
  }  
}
