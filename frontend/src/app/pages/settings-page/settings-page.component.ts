// settings-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DividerModule,
    InputSwitchModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    TooltipModule,
    InputNumberModule,
    SelectButtonModule
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  privacySettings = {
    openToCollab: false,
    sharePortfolio: false,
    allowAIAnalysis: true,
    showInLeaderboard: true,
    anonymizeData: false,
    locationTracking: true
  };

  notificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    collaborationRequests: true,
    weeklyReport: true,
    leaderboardUpdates: true,
    carbonAlerts: true,
    routeChanges: true
  };

  preferenceSettings = {
    defaultTransportMode: 'car',
    distanceUnit: 'km',
    maxCollabDistance: 5,
    theme: 'light',
    language: 'en'
  };

  dataRetentionPeriod: string = '6months';
  
  dataRetentionOptions = [
    { label: '3 Months', value: '3months' },
    { label: '6 Months', value: '6months' },
    { label: '1 Year', value: '1year' },
    { label: 'Forever', value: 'forever' }
  ];

  transportModeOptions = [
    { label: 'Car', value: 'car' },
    { label: 'Public Transport', value: 'public' },
    { label: 'Bicycle', value: 'bicycle' },
    { label: 'Walking', value: 'walking' }
  ];

  distanceUnitOptions = [
    { label: 'Kilometers', value: 'km' },
    { label: 'Miles', value: 'mi' }
  ];

  themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'System', value: 'system' }
  ];

  languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' }
  ];

  exportData() {
    console.log('Exporting user data...');
  }

  deleteAccount() {
    console.log('Initiating account deletion...');
  }

  saveSettings() {
    console.log('Saving settings...');
    // save functionality
  }
}