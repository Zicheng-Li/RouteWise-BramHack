import { Component } from '@angular/core';
import { IdentifierService } from 'src/app/services/config/identifier.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {

    constructor(private identifierService : IdentifierService) {}

    ngOnInit(): void {
        this.identifierService.changeStates(false, true, true)
    }
}
