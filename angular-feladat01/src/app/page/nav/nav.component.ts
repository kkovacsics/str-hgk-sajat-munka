import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../model/user';
import { AuthService } from '../../service/auth.service';
import { ConfigService } from '../../service/config.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() title = ''

  navigation = this.config.navigation
  loginStatus = false;
  userSub: Subscription = new Subscription;
  user: User | null = null;

  constructor(
    private config: ConfigService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.userSub = this.auth.currentUserSubject.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe(); // felszabadítom a memóriát
  }

  onLogout() {
    this.auth.logout(); // kattintással meghívom a kijelentkezést
  }

}
