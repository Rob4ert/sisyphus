import { Component, NgZone } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserService } from "../user.service";
import { APIClientService } from '../api-client.service';
import { User } from '../interfaces';
import { AppRoutingModule } from '../app-routing.module';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: User | null = null;
  subscription: Subscription | undefined;

  public animal: string = 'dog';
  public name: string = 'crazy';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: APIClientService,
    private userService: UserService,
    private route: AppRoutingModule,
    public dialog: MatDialog,

  ) { }

  logoutHandler() {
    this.http.logoutUser().subscribe(() => {
      this.route.sendTo('login');
    });
  }
  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
  }


}
