import { Component, inject } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/firebase/authentication.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent {
    rememberMe: boolean = false;
    email: string = '';
    password: string = '';
    authService = inject(AuthService)

    constructor(private layoutService: LayoutService) {}

    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }

    onSubmit(): void{
        console.log("Email: "+this.email)
        console.log("Password: "+this.password)
        
    }
}
