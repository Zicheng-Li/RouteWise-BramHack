import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { User } from 'src/app/demo/api/user';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, OverlayPanelModule, RippleModule],
  templateUrl: './chat-box.component.html',
 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatBoxComponent implements OnInit {
  defaultUserId: number = 123;
  textContent: string = '';
  @Input() user!: User;

  emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😇', '😉', '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙', '😚'
  ];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  sendMessage() {
    if (this.textContent.trim()) {
      let message = {
        text: this.textContent,
        ownerId: this.defaultUserId,
        createdAt: Date.now(),
      };
      this.chatService.sendMessage(message);
      this.textContent = '';
    }
  }

  onEmojiSelect(emoji: string) {
    this.textContent += emoji;
  }

  parseDate(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}