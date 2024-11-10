import { inject, Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, setDoc, doc } from "@angular/fire/firestore";
import { Car } from "src/app/models/car";
import { Route } from "src/app/models/route";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  firestore = inject(Firestore);

  async uploadRoute(userId: string, route: Route): Promise<void> {
    try {
      // Reference to the 'users' collection
      const usersCollectionRef = collection(this.firestore, 'users');

      // Query for the document where `uuid` matches the provided userId
      const userQuery = query(usersCollectionRef, where('uid', '==', userId));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.error("No user found with the specified uuid.");
        return;
      }

      // Assuming `uuid` is unique, we'll use the first document found
      const userDocRef = userSnapshot.docs[0].ref;

      // Reference to the 'routes' sub-collection within the found user document
      const routesCollectionRef = collection(userDocRef, 'routes');

      // Add the route to the 'routes' sub-collection
      await setDoc(doc(routesCollectionRef), route);
      console.log("Route successfully uploaded to the user's routes sub-collection");
      
    } catch (error) {
      console.error("Error uploading route: ", error);
      throw error; // Optional: rethrow error for further handling
    }
  }

  async uploadCar(userId: string, car: Car): Promise<void> {
    try {
      // Reference to the 'users' collection
      const usersCollectionRef = collection(this.firestore, 'users');

      // Query for the document where `uuid` matches the provided userId
      const userQuery = query(usersCollectionRef, where('uid', '==', userId));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.error("No user found with the specified uuid.");
        return;
      }

      // Assuming `uuid` is unique, we'll use the first document found
      const userDocRef = userSnapshot.docs[0].ref;

      // Reference to the 'routes' sub-collection within the found user document
      const carCollectionRef = collection(userDocRef, 'cars');

      // Add the route to the 'routes' sub-collection
      await setDoc(doc(carCollectionRef), car);
      console.log("Car successfully uploaded to the user's car sub-collection");
      
    } catch (error) {
      console.error("Error uploading route: ", error);
      throw error; // Optional: rethrow error for further handling
    }
  }
  
}
