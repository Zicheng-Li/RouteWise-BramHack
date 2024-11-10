import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { LocationService } from 'src/app/services/maps/location.service';
import { DistanceService } from 'src/app/services/maps/distance.service';
import { UploadService } from 'src/app/services/firebase/upload.service';
import { DataService } from 'src/app/services/firebase/data.service';
import { Route } from 'src/app/models/route';
import { Car } from 'src/app/models/car';

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
export class RouteFormComponent implements OnInit {

  value = '';
  from: any = '';
  to: any = '';
  name: any = '';
  distance : any = "0 kms";
  userId : any = "";
  cost : number = 0;
  emission : number = 0;
  time : string = "";

  selectedDays: [] = [];
  selectedCar! : Car | null;

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

  cars = [];

  constructor( private dataService : DataService, private locationService : LocationService, private distanceService : DistanceService, private uploadService : UploadService) {}

  ngOnInit(): void {

    this.dataService.user$.subscribe((res) => {
        this.userId = res.id;
        this.cars = res.cars;
    });

      this.distanceService.disResponse$.subscribe((res) => {
        this.distance = res.routes[0].legs[0].distance.text;
        this.time = res.routes[0].legs[0].duration.text;

        console.log("this is distance", this.distance);
        console.log("this is time", this.time);
      })
  }

  addRoute() {

    const route : Route = {
        name: this.name,
        cost: this.cost,
        car: this.selectedCar!,
        distance: this.distance,
        emission: this.emission,
        frequency: [0, 1, 1, 0, 0, 1, 1],
        from: this.from,
        to: this.to,
        time: 15
    }

    this.uploadService.uploadRoute(this.userId, route).then(() => alert("Route Added!")).catch(() => alert("some error occured."))
  }

  getLocationSuggestions(query : string, toOrFrom : boolean) {
    this.locationService.searchPlaces(query).subscribe({
        next : (res) => {
            if(toOrFrom) {
                this.to = res.places[0].formattedAddress;
                console.log(res);
            }
            else {
                this.from = res.places[0].formattedAddress;
                console.log(res);
            }
        },
        error : (err : Error) => {
            alert(err);
        },
        complete : () => {
            if(this.to && this.from) {
                this.getDistance();
            }
        }
    })
  }

  getDistance() {
    this.distanceService.getDirections(this.from, this.to).subscribe();
  }


}
