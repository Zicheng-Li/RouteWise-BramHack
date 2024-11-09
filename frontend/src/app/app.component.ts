import { AppConfig, LayoutService } from './layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        // theme configuration (slim color filled sidebar, light mode, green primary color)
        const config: AppConfig = {
            ripple: false,
            inputStyle: 'outlined',
            menuMode: 'slim',
            colorScheme: 'light',
            theme: 'green',
            menuTheme: "primaryColor",
            scale: 14
        };
        this.layoutService.config.set(config);
    }
}
