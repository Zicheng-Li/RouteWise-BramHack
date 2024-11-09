import { Component,  inject } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/firebase/authentication.service';
import {MessageService} from 'primeng/api';

@Component({
    templateUrl: './register.component.html',
})
export class RegisterComponent {
    confirmed: boolean = false;
    email: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    authService = inject(AuthService)
    router = inject(Router);
    messageService = inject(MessageService);

    constructor(private layoutService: LayoutService) {}

    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }

    onSubmit(): void {
        if(this.email == ""){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Email Field is empty'});
            return;
        }
        if(this.firstName == ""){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'First Name Field is empty'});
            return;
        }
        if(this.lastName == ""){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Last Name Field is empty'});
            return;
        }
        if(this.password == ""){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Password Field is empty'});
            return;
        }
        if (!this.confirmed) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Terms and Conditions',
                detail: 'Please accept the terms and conditions to proceed.',
            });
            return;
        }

        this.authService.register(this.email, this.password, this.firstName, this.lastName).subscribe(() => {
            this.router.navigateByUrl('auth/login');
        });
    }
}
