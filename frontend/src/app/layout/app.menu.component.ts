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
                routerLink: ['/user']
            },
            {
                label: 'Social',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Leaderboard',
                        icon: 'pi pi-sliders-h',
                        routerLink: ['/user/social']
                    },
                    {
                        label: 'Chats',
                        icon: 'pi pi-fw pi-comments',
                        routerLink: ['/user/social/chats']
                    },
                ]

            },
            {
                label: 'Information',
                icon: 'pi pi-info-circle',
                routerLink: ['/user/info']
            }
        ];
    }
}
