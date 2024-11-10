import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Ensures the service is provided in the root injector
})
export class TextToSpeechService {
  constructor() {}

  speak(text: string): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-Speech is not supported in this browser.");
    }
  }
}