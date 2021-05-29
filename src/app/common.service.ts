import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getRequest<T>(url: string): Observable<T | any> {
    return this.http.get(url).pipe(
      map((res: any) => res),
      catchError(err => this.handleError(err))
    );
  }

  handleError(err: any): any {
    console.log(err);
    throwError(err);
  }
}
