import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

    private readonly directionsApiUrl = 'https://maps.googleapis.com/maps/api/directions/json';

    private distanceResponse : BehaviorSubject<any> = new BehaviorSubject<any>({});
    disResponse$ : Observable<any> = this.distanceResponse.asObservable();

    constructor(private http: HttpClient) { }

    getDirections(
        origin: string,
        destination: string,
        waypoints: string[] = [],
        mode: string = 'driving'
      ): Observable<any> {

        const payload = {
          origin,
          destination,
          waypoints,
          mode,
        };

        return this.http.post(`${environment.backend.url}/directions`, payload).pipe(
          tap((response) => {
            this.distanceResponse.next(response);
          })
        );
      }
}
