import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http:HttpClient) { }

  generateText(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.openAi.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: message }
      ],
      
      max_tokens: 100

    };

    return this.http.post(this.apiUrl, body, { headers });
  }


}
