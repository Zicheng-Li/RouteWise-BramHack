import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentifierService {

    private isDashboard : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    dashboard$ : Observable<boolean> = this.isDashboard.asObservable();

    private isSocialLeaderboard : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    leaderboard$ : Observable<boolean> = this.isSocialLeaderboard.asObservable();

    private isSocialChats : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    chat$ : Observable<boolean> = this.isSocialChats.asObservable();

  constructor() { }

  changeStates(d : boolean, l : boolean, c : boolean) {
    this.isDashboard.next(d);
    this.isSocialLeaderboard.next(l);
    this.isSocialChats.next(c);
  }
}
