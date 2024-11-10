import { inject, Injectable } from "@angular/core";
import { Firestore, collection, query, where, getDocs, setDoc, doc, getDoc, runTransaction } from "@angular/fire/firestore";
import { Car } from "src/app/models/car";
import { Route } from "src/app/models/route";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  firestore = inject(Firestore);

  async uploadRoute(userId: string, route: Route): Promise<void> {
    try {
      const usersCollectionRef = collection(this.firestore, 'users');
  
      // Query for the document where uid matches the provided userId
      const userQuery = query(usersCollectionRef, where('uid', '==', userId));
      const userSnapshot = await getDocs(userQuery);
  
      if (userSnapshot.empty) {
        console.error("No user found with the specified uuid.");
        return;
      }
  
      const userDocRef = userSnapshot.docs[0].ref;
  
      // Get the current totals from the user document
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
  
      // Initialize totals if they don’t already exist
      const currentTotalCost = userData?.['totalCost'] ?? 0;
      const currentTotalEmission = userData?.['totalEmission'] ?? 0;
      const currentTotalTime = userData?.['totalTime'] ?? 0;
      const currentTotalDistance = userData?.['totalDistance'] ?? 0;
  
      // Calculate new totals by adding the route’s values
    
      const updatedTotalCost = currentTotalCost + route.cost;

      const updatedTotalEmission = currentTotalEmission + route.emission;
      const updatedTotalTime = currentTotalTime + route.time; // Assuming time is optional
      const updatedTotalDistance = currentTotalDistance + route.distance;
  
      // Update the user's total values in the user document
      await setDoc(userDocRef, {
        totalCost: updatedTotalCost,
        totalEmission: updatedTotalEmission,
        totalTime: updatedTotalTime,
        totalDistance: updatedTotalDistance
      }, { merge: true });
  
      // Reference to the 'routes' sub-collection within the user document
      const routesCollectionRef = collection(userDocRef, 'routes');
  
      // Add the route to the 'routes' sub-collection
      await setDoc(doc(routesCollectionRef), route);
      console.log("Route successfully uploaded and totals updated in the user's document");
  
    } catch (error) {
      console.error("Error uploading route: ", error);
      throw error;
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
