import { Injectable, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Observable, from } from "rxjs";
import { Firestore, collection, addDoc } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  firebaseAuth = inject(Auth);
  firestore = inject(Firestore);

  register(email: string, password: string, firstName: string, lastName: string): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((userCredential) => {
      const uid = userCredential.user?.uid;

      if (uid) {
        const usersCollection = collection(this.firestore, 'users');
        
        // Add user info to Firestore with additional fields
        return addDoc(usersCollection, {
          uid: uid,
          firstName: firstName,
          lastName: lastName,
          friends: [], // Initialize as an empty array
          totalEmission: 0 // Initialize to zero
        }).then(() => userCredential); // Return the user credential after Firestore insert
      } else {
        throw new Error("User ID is undefined.");
      }
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() =>{});
    return from(promise);
  }
}
