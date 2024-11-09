import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'https://places.googleapis.com/v1/places:searchText';

  constructor(private http : HttpClient) { }

  searchPlaces(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': environment.googleMaps.apiKey,
      'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.priceLevel', // Adjust field mask as needed
    });

    const body = {
      textQuery: query,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
