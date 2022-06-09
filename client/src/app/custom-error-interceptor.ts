import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class CustomErrorInterceptor implements ErrorHandler {

  constructor(public snackBar: MatSnackBar, private zone: NgZone,) { }

  handleError(error: any): void {
    console.log('error :>> ', error);
    let message = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      message = error.error;
    } else if (error.status === 409) {
      message = 'Email already in use.';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return a snackBar with a user-facing error message.
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    this.zone.run(() => {
      this.snackBar.open(message, 'Dismiss', config);
    });
  }
}
