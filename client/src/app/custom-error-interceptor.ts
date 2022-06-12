import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class CustomErrorInterceptor implements ErrorHandler {

  constructor(public snackBar: MatSnackBar, private zone: NgZone, private router: Router) { }

  handleError(error: any): void {
    console.log('error :>> ', error);
    let message = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      message = error.error.error;
    } else if (error.status === 400) {
      message = error.error.error;
    } else if (error.status === 401) {
      message = error.error.error;
      this.router.navigate(['/login']);
    } else if (error.status === 409) {
      message = error.error.error;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      message = '';
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return a snackBar with a user-facing error message.
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.panelClass = ['mat-toolbar', 'mat-warn'];
    config.duration = 2000;
    this.zone.run(() => {
      this.snackBar.open(message, 'Dismiss', config);
    });
  }
}
