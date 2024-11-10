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
    authService = inject(AuthService)
    messageService = inject(MessageService);
    router = inject(Router);

    constructor(private layoutService: LayoutService, private dataService : DataService) {}

    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }

    onSubmit(): void{
        if(this.email == ""){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Email Field is empty'});
            return;
        }
        if(this.password == ""){
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Password Field is empty'});
            return;
        }

        this.authService.login(this.email, this.password).subscribe({
            next : (userId) => {
                this.dataService.getData(userId);
            },
            error : (err) => {
                this.messageService.add({severity:'error', summary: 'Error', detail: err});
            },
            complete : () => {
                this.router.navigateByUrl("/user");
            }
        });
    }
}
