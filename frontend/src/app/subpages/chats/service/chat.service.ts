import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from 'src/app/demo/api/message';
import { User } from 'src/app/demo/api/user';

@Injectable()
export class ChatService {

    _activeUser: User = {
        "id": 1,
        "name": "Sydney Sweeney",
        "image": "ionibowcher.png",
        "status": "active",
        "messages": [
            {
                "text": "Hey, I'm thinking about starting a carpool from Oshawa to Bowmanville to cut down on emissions. Interested?",
                "ownerId": 1,
                "createdAt": 1652646338240
            },
            {
                "text": "I calculated that we could save up to 20 kg of CO2 emissions weekly by carpooling. Let's do this!",
                "ownerId": 1,
                "createdAt": 1652646368718
            },
            {
                "text": "That's amazing! Count me in. I will make the money transfer right away!",
                "ownerId": 123,
                "createdAt": 1652646368718
            }
        ],
        "lastSeen": "2d"
    }

    private activeUser = new BehaviorSubject<User>(this._activeUser);

    activeUser$ = this.activeUser.asObservable();

    constructor(private http: HttpClient) { }

    getChatData() {
        return this.http.get<any>('assets/demo/data/chat.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    changeActiveChat(user: User) {
        this._activeUser = user;
        this.activeUser.next(user);
    }

    sendMessage(message: Message) {
        this._activeUser.messages.push(message);
        this.activeUser.next(this._activeUser);
    }
}
