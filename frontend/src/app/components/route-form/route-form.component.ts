import { AfterViewInit, Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [
    GoogleMapsModule,
    DropdownModule,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    DialogModule,
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    MultiSelectModule,
    ChipModule,
  ],
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent {

  value = '';
  from: any = '';
  to: any = '';
  name: any = '';

  selectedDays: [] = [];
  selectedCar = {};

  autocomplete : google.maps.places.Autocomplete | undefined;

  days = [
    { name: 'Monday', code: 'mon' },
    { name: 'Tuesday', code: 'tue' },
    { name: 'Wednesday', code: 'wed' },
    { name: 'Thursday', code: 'thu' },
    { name: 'Friday', code: 'fri' },
    { name: 'Saturday', code: 'sat' },
    { name: 'Sunday', code: 'sun' },
  ];

  cars = [
    { name: 'Toyota', code: 'NY' },
    { name: 'Ferrari', code: 'RM' },
    { name: 'Porsche', code: 'LDN' },
  ];
}
