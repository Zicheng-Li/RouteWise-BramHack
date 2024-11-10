import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/firebase/authentication.service';
import { DataService } from 'src/app/services/firebase/data.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    rememberMe: boolean = false;
    email: string = '';
    password: string = '';
    isListening = false;
    listeningField: 'email' | 'password' | null = null;
    enableSpeech: boolean = false; // Added this property
    recognition: any;

    authService = inject(AuthService);
    messageService = inject(MessageService);
    router = inject(Router);

    constructor(private layoutService: LayoutService, private dataService: DataService) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.interimResults = false;
        this.recognition.maxAlternatives = 1;

        this.recognition.addEventListener('result', (event: any) => {
            let transcript = event.results[0][0].transcript;
            console.log('Transcribed text:', transcript);

            // Process transcript based on the field being listened to
            if (this.listeningField === 'email') {
                transcript = transcript.replace(/\s/g, '').replace(/at/g, '@');
                if (!transcript.includes('@')) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email must contain @ symbol' });
                } else {
                    this.email = transcript;
                }
            } else if (this.listeningField === 'password') {
                this.password = transcript;
            }
        });

        this.recognition.addEventListener('end', () => {
            this.isListening = false;
            this.listeningField = null;
        });
    }

    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }

    onSubmit(): void {
        if (this.email === "") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email Field is empty' });
            return;
        }
        if (this.password === "") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password Field is empty' });
            return;
        }

        this.authService.login(this.email, this.password).subscribe({
            next: (userId) => {
                this.dataService.getData(userId);
            },
            error: (err) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
            },
            complete: () => {
                this.router.navigateByUrl("/user");
            }
        });
    }

    startListening(field: 'email' | 'password') {
        this.isListening = true;
        this.listeningField = field;
        this.recognition.start();
    }
}