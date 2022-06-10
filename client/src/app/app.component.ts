import { Component } from '@angular/core';
import { APIClientService } from './api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sisyphus';
  constructor(private http: APIClientService,) { }
  ngOnInit(): void {
    this.http.getUser().subscribe(res => console.log('res :>> ', res));
  }
}
