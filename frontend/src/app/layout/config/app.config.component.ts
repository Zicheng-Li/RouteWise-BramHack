import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from '../app.menu.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { analyzePortfolioPrompt } from 'src/app/helpers/prompt';

import {
    ColorScheme,
    LayoutService,
    MenuColorScheme,
    MenuMode,
} from '../service/app.layout.service';
import { IdentifierService } from 'src/app/services/config/identifier.service';
import { DataService } from 'src/app/services/firebase/data.service';
import { AiService } from 'src/app/services/ai/ai.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html',
})
export class AppConfigComponent implements OnInit {
    @Input() minimal: boolean = false;

    componentThemes: any[] = [];

    scales: number[] = [12, 13, 14, 15, 16];

    user : any;

    aiResponse : any;

    isSocialLeaderboard : boolean = false;
    isDashboard : boolean = false;
    isSocialChats : boolean = false;

    friends = [
        { name: 'Rushi', code: 'NY' },
        { name: 'Sarthak', code: 'RM' },
        { name: 'Lodu', code: 'LDN' },
        { name: 'Chandu', code: 'IST' },
        { name: 'Bihari', code: 'PRS' }
    ];

    selectedFriend = {};

    constructor(
        public layoutService: LayoutService,
        public menuService: MenuService,
        private router : Router,
        private identifierService : IdentifierService,
        private dataService : DataService,
        private aiService : AiService
    ) {}

    analyzePortfolio() {

        const prompt = analyzePortfolioPrompt(this.user);

        this.aiService.generateText(prompt).subscribe((res) => {
            this.aiResponse = res.choices[0].message.content;
        });
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config().scale;
    }
    set scale(_val: number) {
        this.layoutService.config.update((config) => ({
            ...config,
            scale: _val,
        }));
    }

    get menuMode(): MenuMode {
        return this.layoutService.config().menuMode;
    }
    set menuMode(_val: MenuMode) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuMode: _val,
        }));
        if (
            this.layoutService.isSlimPlus() ||
            this.layoutService.isSlim() ||
            this.layoutService.isHorizontal()
        ) {
            this.menuService.reset();
        }
    }

    get colorScheme(): ColorScheme {
        return this.layoutService.config().colorScheme;
    }
    set colorScheme(_val: ColorScheme) {
        this.layoutService.config.update((config) => ({
            ...config,
            colorScheme: _val,
        }));
    }

    get inputStyle(): string {
        return this.layoutService.config().inputStyle;
    }
    set inputStyle(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            inputStyle: _val,
        }));
    }

    get ripple(): boolean {
        return this.layoutService.config().ripple;
    }
    set ripple(_val: boolean) {
        this.layoutService.config.update((config) => ({
            ...config,
            ripple: _val,
        }));
    }

    get menuTheme(): MenuColorScheme {
        return this.layoutService.config().menuTheme;
    }
    set menuTheme(_val: MenuColorScheme) {
        this.layoutService.config.update((config) => ({
            ...config,
            menuTheme: _val,
        }));
    }

    get theme(): string {
        return this.layoutService.config().theme;
    }
    set theme(_val: string) {
        this.layoutService.config.update((config) => ({
            ...config,
            theme: _val,
        }));
    }

    ngOnInit() {

        this.isSocialLeaderboard = false;
        this.isDashboard = false;
        this.isSocialChats = false;

        this.dataService.user$.subscribe((res) => {
            this.user = res;
        })

        this.componentThemes = [
            { name: 'indigo', color: '#6366F1' },
            { name: 'blue', color: '#3B82F6' },
            { name: 'purple', color: '#8B5CF6' },
            { name: 'teal', color: '#14B8A6' },
            { name: 'cyan', color: '#06b6d4' },
            { name: 'green', color: '#10b981' },
            { name: 'orange', color: '#f59e0b' },
            { name: 'pink', color: '#d946ef' },
        ];

        this.identifierService.dashboard$.subscribe((res) => {
            this.isDashboard = res;
        })

        this.identifierService.leaderboard$.subscribe((res) => {
            this.isSocialLeaderboard = res;
        })

        this.identifierService.chat$.subscribe((res) => {
            this.isSocialChats = res;
        })
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeColorScheme(colorScheme: ColorScheme) {
        this.colorScheme = colorScheme;
    }

    changeTheme(theme: string) {
        this.theme = theme;
    }

    decrementScale() {
        this.scale--;
    }

    incrementScale() {
        this.scale++;
    }
}
