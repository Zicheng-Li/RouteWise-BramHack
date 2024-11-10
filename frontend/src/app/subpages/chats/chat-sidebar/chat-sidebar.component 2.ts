import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../service/chat.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-chat-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, AvatarModule, UserCardComponent],
  templateUrl: './chat-sidebar.component.html',
  
})
export class ChatSidebarComponent implements OnInit {
  searchValue: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getChatData().then((data) => {
      this.users = data;
      this.filteredUsers = this.users;
    });
  }

  filter() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().startsWith(this.searchValue.toLowerCase())
    );
  }
}