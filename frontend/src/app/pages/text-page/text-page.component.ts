import { Component } from '@angular/core';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss'],
  standalone: true,
})
export class TextPageComponent {
  textToSpeak: string = 'This is the paragraph text that will be spoken aloud when you click the button.';

  // Method to speak the text
  speakText() {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.textToSpeak);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech is not supported in this browser.");
    }
  }
}