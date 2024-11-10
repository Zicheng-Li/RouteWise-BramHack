import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-speech-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './speech-page.component.html',
  styleUrls: ['./speech-page.component.scss']
})
export class SpeechPageComponent {
  username: string = '';
  password: string = '';
  isListening = false;
  listeningField: 'username' | 'password' | null = null;
  recognition: any;

  constructor() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.addEventListener('result', (event: any) => {
      const transcript = event.results[0][0].transcript;
      console.log('Transcribed text:', transcript);
      
      // Assign transcribed text to the appropriate field
      if (this.listeningField === 'username') {
        this.username = transcript;
      } else if (this.listeningField === 'password') {
        this.password = transcript;
      }
    });

    this.recognition.addEventListener('end', () => {
      this.isListening = false;
      this.listeningField = null;
    });
  }

  startListening(field: 'username' | 'password') {
    this.isListening = true;
    this.listeningField = field;
    this.recognition.start();
  }
}