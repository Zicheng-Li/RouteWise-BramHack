import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [DropdownModule, ButtonModule, InputGroupAddonModule, InputGroupModule, InputTextModule, DialogModule, CommonModule, FormsModule, ConfirmDialogModule, OverlayPanelModule, MultiSelectModule, ChipModule],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss'
})
export class RouteFormComponent {

    value = "";
    from : any = "";
    to : any = "";
    name : any = "";

    selectedDays : [] = [];
    selectedCar = {};

    days = [
        {name: 'Monday', code: 'mon'},
        {name: 'Tuesday', code: 'tue'},
        {name: 'Wednesday', code: 'wed'},
        {name: 'Thursday', code: 'thu'},
        {name: 'Friday', code: 'fri'},
        {name: 'Saturday', code: 'sat'},
        {name: 'Sundary', code: 'sun'},
    ];

    cars = [
        { name: 'Toyota', code: 'NY' },
        { name: 'Ferrari', code: 'RM' },
        { name: 'Porsche', code: 'LDN' }
    ];
}
