import { inject, Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, doc, collectionData } from "@angular/fire/firestore";
import { Observable, from, forkJoin } from "rxjs";
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

  async getRouteExceptCurrent(userId: string): Promise<any[]> {
    try {
      const usersCollectionRef = collection(this.firestore, 'users');
      
      // Query for all users except the one with the given userId
      const usersQuery = query(usersCollectionRef, where('uid', '!=', userId));
      console.log("Querying users except for the one with userId:", userId);
  
      const userSnapshots = await getDocs(usersQuery);
      console.log("Fetched user snapshots:", userSnapshots.docs.length, "users found");
  
      // Create an array of promises for fetching routes and user data from each user's document
      const routePromises = userSnapshots.docs.map(async (userDoc) => {
        const userData = userDoc.data();  // Get the user data
        const routesCollectionRef = collection(userDoc.ref, 'routes');
        console.log("Fetching routes for user:", userDoc.id);
  
        const routesSnapshot = await getDocs(routesCollectionRef);
        const routes = routesSnapshot.docs.map(doc => doc.data());
  
        // Return both user data and the routes as part of the result
        return {
          user: userData,
          routes: routes
        };
      });
  
      // Wait for all promises to resolve and combine all data into a single array
      const allData = await Promise.all(routePromises);
      console.log("All user data and routes fetched:", allData);
  
      return allData;  // Return the combined array with user data and routes
    } catch (error) {
      console.error("Error fetching routes and user data:", error);
      throw error;
    }
  }
  
}
