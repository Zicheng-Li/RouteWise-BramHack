import { Component } from '@angular/core';
import { AiService } from 'src/app/services/ai/ai.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {
  userInput:string='';
  response:string | null=null;

  constructor(private gptService: AiService){}

  getResponse() {
    if(this.userInput.trim()){
      this.gptService.generateText(this.userInput)
      .subscribe(response => {
        this.response=response.choices[0].message.content; 
        this.userInput='';
        console.log(response);
      });
    }
    
    }

}
