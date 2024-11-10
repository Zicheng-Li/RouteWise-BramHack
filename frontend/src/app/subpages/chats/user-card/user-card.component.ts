import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { User } from 'src/app/demo/api/user';
import { Message } from 'src/app/demo/api/message';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, AvatarModule, BadgeModule],
  templateUrl: './user-card.component.html',

})
export class UserCardComponent implements OnInit {
  @Input() user!: User;
  lastMessage!: Message;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const filteredMessages = this.user.messages.filter(m => m.ownerId !== 123);
    this.lastMessage = filteredMessages[filteredMessages.length - 1];
  }

  changeView(user: User) {
    this.chatService.changeActiveChat(user);
  }
}