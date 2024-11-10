import { Component } from '@angular/core';
import { TextToSpeechService } from 'src/app/services/textToSpeech/text-to-speech.service';
@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss'],
  standalone: true,
})
export class TextPageComponent {
  textToSpeak: string = 'This is a string to test text-to-speech';

  constructor(private textToSpeechService: TextToSpeechService) {}

  speakText() {
    this.textToSpeechService.speak(this.textToSpeak);
  }
}