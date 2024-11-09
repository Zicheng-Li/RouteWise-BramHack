import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-route-form',
  standalone: true,
  imports: [InputTextModule, DialogModule, CommonModule, FormsModule, ConfirmDialogModule, OverlayPanelModule],
  templateUrl: './route-form.component.html',
  styleUrl: './route-form.component.scss'
})
export class RouteFormComponent {

    value = "";
    from : any = "";
    to : any = "";
    name : any = "";
}
