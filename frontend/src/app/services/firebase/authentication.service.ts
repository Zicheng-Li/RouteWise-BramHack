import { Injectable, inject } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, UserCredential, signInWithEmailAndPassword } from "@angular/fire/auth";
import { BehaviorSubject, Observable, from } from "rxjs";
import { Firestore, collection, addDoc } from "@angular/fire/firestore";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {

    private userId : BehaviorSubject<string> = new BehaviorSubject<string>("");
    userId$ : Observable<string> = this.userId.asObservable();

    private voiceAssist : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    va$ : Observable<boolean> = this.voiceAssist.asObservable();

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
          totalEmission: 0, // Initialize to zero
          totalCost: 0,
          totalTime: 0,
          totalDistance: 0,
          email: email
        }).then(() => userCredential); // Return the user credential after Firestore insert
      } else {
        throw new Error("User ID is undefined.");
      }
    });

    return from(promise);
  }

  login(email: string, password: string): Observable<string> {
    const promise: Promise<UserCredential> = signInWithEmailAndPassword(this.firebaseAuth, email, password);

    return from(promise).pipe(
      map((userCredential) => {
        if (!userCredential || !userCredential.user) {
          throw new Error("UserCredential or user is undefined");
        }
        let response = userCredential.user.uid;
        this.userId.next(response);
        return response;
      }),
      catchError((error) => {
        console.error("Login failed:", error);  // Log the error for debugging
        return [""];  // Return an empty string or handle the error as needed
      })
    );
  }

  getUserId(): string | null {
    let response = this.firebaseAuth.currentUser?.uid ?? null;
    this.userId.next(response!);
    return response;
  }

  needsAssist(b : boolean) {
    this.voiceAssist.next(true);
  }
}
