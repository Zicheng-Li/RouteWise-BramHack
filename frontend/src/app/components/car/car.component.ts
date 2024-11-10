import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { UploadService } from 'src/app/services/firebase/upload.service';
import { DataService } from 'src/app/services/firebase/data.service';
import { AuthService } from 'src/app/services/firebase/authentication.service';

interface Car {
    year: number;
    name: string;
    make: string;
    model: string;
    efficiency: number;
}

@Component({
    selector: 'app-car',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DropdownModule,
        InputTextModule,
        ButtonModule,
        ChipModule,
    ],
    templateUrl: './car.component.html',
    styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
    selectedYear: number | null = null;
    selectedMake: string | null = null;
    selectedModel: string | null = null;
    selectedCarName: string | null = null;
    efficiency: number = 0;
    userId = "";

    @Output() carEmitter : EventEmitter<Car> = new EventEmitter<Car>();

    makes = [
        { name: 'Ferrari', code: 'Ferrari' },
        { name: 'Tesla', code: 'Tesla' },
        { name: 'Honda', code: 'Honda' },
        { name: 'Ford', code: 'Ford' },
        { name: 'Toyota', code: 'Toyota' },
    ];

    models: { model: string; make: string }[] = [
        { model: '718', make: 'Ferrari' },
        { model: '488', make: 'Ferrari' },
        { model: 'Portofino', make: 'Ferrari' },
        { model: 'Model S', make: 'Tesla' },
        { model: 'Model X', make: 'Tesla' },
        { model: 'Model 3', make: 'Tesla' },
        { model: 'Accord', make: 'Honda' },
        { model: 'Civic', make: 'Honda' },
        { model: 'CR-V', make: 'Honda' },
        { model: 'F-150', make: 'Ford' },
        { model: 'Raptor', make: 'Ford' },
        { model: 'Fusion', make: 'Ford' },
        { model: 'Camry', make: 'Toyota' },
        { model: 'Corolla', make: 'Toyota' },
        { model: 'Highlander', make: 'Toyota' },
    ];

    // Define filteredModels with the same type as models
    filteredModels: { model: string; make: string }[] = [];

    carData: Car[] = [
        { year: 2012, name: 'Speedster', make: 'Ferrari', model: '718', efficiency: 12 },
        { year: 2015, name: 'Turbo', make: 'Ferrari', model: '488', efficiency: 10 },
        { year: 2018, name: 'Luxury', make: 'Ferrari', model: 'Portofino', efficiency: 11 },
        { year: 2020, name: 'Electric X', make: 'Tesla', model: 'Model S', efficiency: 112 },
        { year: 2021, name: 'Family', make: 'Tesla', model: 'Model X', efficiency: 98 },
        { year: 2022, name: 'Sport', make: 'Tesla', model: 'Model 3', efficiency: 120 },
        { year: 2023, name: 'Classic', make: 'Honda', model: 'Accord', efficiency: 32 },
        { year: 2022, name: 'Compact', make: 'Honda', model: 'Civic', efficiency: 36 },
        { year: 2021, name: 'SUV', make: 'Honda', model: 'CR-V', efficiency: 28 },
        { year: 2021, name: 'Offroad', make: 'Ford', model: 'F-150', efficiency: 15 },
        { year: 2022, name: 'Power', make: 'Ford', model: 'Raptor', efficiency: 13 },
        { year: 2020, name: 'Eco', make: 'Ford', model: 'Fusion', efficiency: 20 },
        { year: 2020, name: 'Reliable', make: 'Toyota', model: 'Camry', efficiency: 33 },
        { year: 2019, name: 'Economy', make: 'Toyota', model: 'Corolla', efficiency: 35 },
        { year: 2023, name: 'Adventure', make: 'Toyota', model: 'Highlander', efficiency: 25 },
    ];

    constructor(private uploadService : UploadService, private authService : AuthService) {}

    ngOnInit(): void {
        this.authService.userId.subscribe((res) => {
            this.userId = res;
        })
    }

    // Update models based on the selected make
    updateModels() {
        this.filteredModels = this.models.filter(
            (model) => model.make === this.selectedMake
        );
        this.selectedModel = null; // Reset model selection when make changes
        this.updateEfficiency(); // Clear efficiency when make changes
    }

    // Update efficiency based on selected make and model
    updateEfficiency() {
        const selectedCar = this.carData.find(
            (car) =>
                car.make === this.selectedMake &&
                car.model === this.selectedModel
        );
        this.efficiency = selectedCar ? selectedCar.efficiency : 0;
    }

    saveCarData() {
        const carData: Car = {
            year: this.selectedYear!,
            name: this.selectedCarName!,
            make: this.selectedMake!,
            model: this.selectedModel!,
            efficiency: this.efficiency,
        };

        console.log(carData);
        console.log(" this is the user id!!!! ",this.userId);

        this.uploadService.uploadCar(this.userId, carData).then(() => alert("Route Added!")).catch(() => alert("some error occured."));
    }
}
