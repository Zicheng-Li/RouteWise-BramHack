import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                icon: 'pi pi-home',
                routerLink: ['/']
            },
            {
                label: 'Social',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Leaderboard',
                        icon: 'pi pi-sliders-h',
                        routerLink: ['/social']
                    },
                    {
                        label: 'Chats',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/social/chats']
                    },
                ]

            }
        ];
    }
}
