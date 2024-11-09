import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { MessageService } from 'primeng/api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        provideFirebaseApp(() => initializeApp({"projectId":"bramhacks-1ca31","appId":"1:38560218062:web:4bd64705db4924859f099f","storageBucket":"bramhacks-1ca31.firebasestorage.app","apiKey":"AIzaSyB3AxbrGxxexzw27S4tBjRlxqkAE2LvDfE","authDomain":"bramhacks-1ca31.firebaseapp.com","messagingSenderId":"38560218062","measurementId":"G-B273RBE012"})),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideDatabase(() => getDatabase()),
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
