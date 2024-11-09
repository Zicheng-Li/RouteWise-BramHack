import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/demo/api/user';
import { ChatService } from './service/chat.service';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    BadgeModule,
    OverlayPanelModule,
    RippleModule,
    ChatSidebarComponent,
    ChatBoxComponent,
    UserCardComponent // Import UserCardComponent directly as it's now standalone
  ],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
  providers: [ChatService],
})
export class ChatsComponent implements OnDestroy {
  subscription: Subscription;
  activeUser!: User;

  constructor(private chatService: ChatService) {
    this.subscription = this.chatService.activeUser$.subscribe((data) => (this.activeUser = data));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}