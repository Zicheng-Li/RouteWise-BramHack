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
import { OnInit } from '@angular/core';
import { IdentifierService } from 'src/app/services/config/identifier.service';

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

export class ChatsComponent implements OnDestroy, OnInit {
  subscription: Subscription;
  activeUser!: User;


  constructor(private chatService: ChatService, private identifierService : IdentifierService) {
    this.subscription = this.chatService.activeUser$.subscribe((data) => (this.activeUser = data));
  }

  ngOnInit(): void {
    this.identifierService.changeStates(false, false, true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
