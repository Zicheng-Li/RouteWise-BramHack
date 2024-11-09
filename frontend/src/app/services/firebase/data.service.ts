import { inject, Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, doc, collectionData } from "@angular/fire/firestore";
import { Observable, from } from "rxjs";
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataService {
  firestore = inject(Firestore);

  getData(userId: string): Observable<any> {
    const usersCollectionRef = collection(this.firestore, 'users');
    const userQuery = query(usersCollectionRef, where('uid', '==', userId));

    return from(getDocs(userQuery)).pipe(
      switchMap((userSnapshot) => {
        if (userSnapshot.empty) {
          throw new Error("User not found");
        }

        // Get the first document that matches the user ID
        const userDocRef = userSnapshot.docs[0].ref;
        const userData = userSnapshot.docs[0].data();

        // Fetch routes from the routes sub-collection
        const routesCollectionRef = collection(userDocRef, 'routes');
        const routes$ = collectionData(routesCollectionRef);

        // Fetch cars from the cars sub-collection
        const carsCollectionRef = collection(userDocRef, 'cars');
        const cars$ = collectionData(carsCollectionRef);

        // Combine user data, routes, and cars
        return routes$.pipe(
          switchMap((routes) => 
            cars$.pipe(
              map((cars) => ({
                firstName: userData['firstName'],
                lastName: userData['lastName'],
                routes: routes,
                cars: cars,
                friends: userData['friends'],
                totalEmission: userData['totalEmission']
              }))
            )
          )
        );
      })
    );
  }

}
