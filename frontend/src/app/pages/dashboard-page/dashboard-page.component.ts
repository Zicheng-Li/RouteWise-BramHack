import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { analyzePortfolioPrompt } from 'src/app/helpers/prompt';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ChartModule } from 'primeng/chart';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { Subscription, debounceTime } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RouteFormComponent } from "../../components/route-form/route-form.component";
import { CarComponent } from "../../components/car/car.component";
import { DataService } from 'src/app/services/firebase/data.service';
import { UploadService } from 'src/app/services/firebase/upload.service';
import { Route } from 'src/app/models/route';
import { Car } from 'src/app/models/car';
import { AiService } from 'src/app/services/ai/ai.service';
import { IdentifierService } from 'src/app/services/config/identifier.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from 'src/app/services/firebase/authentication.service';

interface MonthlyPayment {
    name?: string;
    amount?: number;
    paid?: boolean;
    date?: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    CommonModule,
    ButtonModule,
    RippleModule,
    TagModule,
    DialogModule,
    TooltipModule,
    TableModule,
    InputNumberModule,
    ChartModule,
    ConfirmDialogModule,
    OverlayPanelModule, RouteFormComponent, CarComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})

export class DashboardPageComponent implements OnInit, OnDestroy {

    user : any;
    userId : any;
    chartData: any;

    routeModel! : Route;
    carModel! : Car;

    chartOptions: any;

    payments: MonthlyPayment[] = [];

    subscription: Subscription;

    display : boolean = false;
    displayCar: boolean = false;

    cars: Car[] = [
        {
          year: 2019,
          name: "green machine",
          make: "Honda",
          model: "Civic",
          efficiency: 32
        },
        {
          year: 2022,
          name: "fastback",
          make: "Ford",
          model: "Mustang",
          efficiency: 15
        },
        {
          year: 2021,
          name: "quiet cruiser",
          make: "Nissan",
          model: "Leaf",
          efficiency: 120
        }
      ];
      routes: Route[] = [
        {
          name: "morning commute",
          from: "apartment",
          to: "downtown office",
          distance: 18,
          emission: 7,
          cost: 12,
          time: 30,
          frequency: [1, 1, 1, 1, 1, 0, 0],
          car: this.cars[0]  // "green machine"
        },
        {
          name: "business trip",
          from: "home",
          to: "airport",
          distance: 45,
          emission: 12,
          cost: 25,
          frequency: [1, 1, 1, 1, 1, 1, 0],
          time: 20,
          car: this.cars[1]  // "fastback"
        },
        {
          name: "park & ride",
          from: "suburb",
          to: "city center",
          distance: 10,
          emission: 3,
          cost: 8,
          time: 50,
          frequency: [0, 0, 1, 1, 1, 0, 0],
          car: this.cars[2]  // "quiet cruiser"
        }
      ];

    constructor(private layoutService: LayoutService, private dataService: DataService ,private aiService : AiService, private identifierService : IdentifierService
        ,private uploadService : UploadService, private authService : AuthService) {


        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initChart();
            });
    }

    ngOnInit() {

        this.authService.userId$.subscribe((res) => {
            this.userId = res;
            console.log(this.userId);
        })

        this.dataService.user$.subscribe((res) => {
            this.user = res;
            console.log(this.user);

        // this.routes.forEach((route) => {
        //     // Upload car data first
        //     this.uploadService.uploadCar("J69hAKRxOxWzhusH0b6CwmSycwC2", route.car)
        //       .then(() => {
        //         console.log(`Car "${route.car.name}" uploaded successfully.`);
        //       })
        //       .catch((error) => {
        //         console.error(`Error uploading car "${route.car.name}":`, error);
        //       });

        //     // Upload route data after the car
        //     this.uploadService.uploadRoute("J69hAKRxOxWzhusH0b6CwmSycwC2", route)
        //       .then(() => {
        //         console.log(`Route "${route.name}" uploaded successfully.`);
        //       })
        //       .catch((error) => {
        //         console.error(`Error uploading route "${route.name}":`, error);
        //       });
        //   });


        // this.dataService.getData("J69hAKRxOxWzhusH0b6CwmSycwC2").subscribe({
        //     next: (data) => {
        //       console.log('User Data:', data);
        //     },
        //     error: (error) => {
        //       console.error('Error fetching data:', error);
        //     }
        //   });
        })

        this.identifierService.changeStates(true, false, false);


        this.initChart();

        this.payments = [
            {
                name: 'Electric Bill',
                amount: 75.6,
                paid: true,
                date: '06/04/2022',
            },
            {
                name: 'Water Bill',
                amount: 45.5,
                paid: true,
                date: '07/04/2022',
            },
            { name: 'Gas Bill', amount: 45.2, paid: false, date: '12/04/2022' },
            {
                name: 'Internet Bill',
                amount: 25.9,
                paid: true,
                date: '17/04/2022',
            },
            {
                name: 'Streaming',
                amount: 40.9,
                paid: false,
                date: '20/04/2022',
            },
        ];
    }

    uploadRoute() {
        this.uploadService.uploadRoute(this.userId, this.routeModel).then(() => alert("Route Added!")).catch(() => alert("some error occured."));
    }

    handleRouteEmit(event : any) {
        this.routeModel = event;
        console.log(this.routeModel);
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
            ],
            datasets: [
                {
                    label: 'Target',
                    data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                    fill: false,
                    tension: 0.4,
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                },
                {
                    label: 'Personal Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
                    fill: true,
                    borderColor: '#6366f1',
                    tension: 0.4,
                    backgroundColor: 'rgba(99,102,220,0.2)',
                },
            ],
        };

        this.chartOptions = {
            animation: {
                duration: 0,
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }

                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(context.parsed.y);
                            }
                            return label;
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    displayRouteDiag() {
        this.display = !this.display;
    }
    displayCarDialog() {
        this.displayCar = !this.displayCar;
    }
}
