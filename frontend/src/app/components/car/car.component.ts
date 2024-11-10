import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';

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
export class CarComponent {
    selectedYear: number | null = null;
    selectedMake: string | null = null;
    selectedModel: string | null = null;
    selectedCarName: string | null = null;
    efficiency: number = 0;

    years = [{ year: 2012 }, { year: 2020 }, { year: 2023 }];
    makes = [
        { name: 'Ferrari', code: 'Ferrari' },
        { name: 'Tesla', code: 'Tesla' },
        { name: 'Honda', code: 'Honda' },
        { name: 'Ford', code: 'Ford' },
    ];
    models = [
        { model: '718', make: 'Ferrari' },
        { model: 'Model S', make: 'Tesla' },
        { model: 'Accord', make: 'Honda' },
        { model: 'F-150', make: 'Ford' },
    ];
    names = [
        { name: 'Speedster', model: '718' },
        { name: 'Electric X', model: 'Model S' },
        { name: 'Classic', model: 'Accord' },
        { name: 'Offroad', model: 'F-150' },
    ];

    carData: Car[] = [
        { year: 2012, name: 'Speedster', make: 'Ferrari', model: '718', efficiency: 12 },
        { year: 2020, name: 'Electric X', make: 'Tesla', model: 'Model S', efficiency: 112 },
        { year: 2023, name: 'Classic', make: 'Honda', model: 'Accord', efficiency: 32 },
        { year: 2021, name: 'Offroad', make: 'Ford', model: 'F-150', efficiency: 15 },
    ];

    // Update efficiency when all selections are made
    updateEfficiency() {
        const selectedCar = this.carData.find(
            (car) =>
                car.year === this.selectedYear &&
                car.make === this.selectedMake &&
                car.model === this.selectedModel &&
                car.name === this.selectedCarName
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
        console.log('Car data to save:', carData);
    }
}