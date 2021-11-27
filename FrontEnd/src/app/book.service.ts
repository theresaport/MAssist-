import { Injectable } from '@angular/core';
import { Book } from './models/book.model';
import { Marketer } from './models/marketer.model';
import { MarketMaterial } from './models/market-material.model';
import { MarketerAssignemnt } from './models/marketer-assignemnt.model';
import { MarketMaterialAssignemnt } from './models/market-material-assignemnt.model';
import { catchError, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { GlobalConstants } from './common/global-constants';
@Injectable({
  providedIn: 'root',
})
export class BookService {
  private baseURL = GlobalConstants.baseURL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.baseURL}/api/v1/Marketers/GetBooks`)
      .pipe(
        tap((data) => console.log('tap success')),
        catchError(this.handleError)
      );
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(
      `${this.baseURL}/api/v1/Marketers/GetBook/${id}`
    );
  }

  getMarketers(): Observable<Marketer[]> {
    return this.http.get<Marketer[]>(
      `${this.baseURL}/api/v1/Marketers/GetMarketers`
    );
  }

  getMarketerAssignments(bookId: number): Observable<MarketerAssignemnt> {
    let url = `${this.baseURL}/api/v1/Marketers/GetMarketerAssignments/${bookId}`;
    return this.http.get<MarketerAssignemnt>(url, this.httpOptions);
  }

  getMarketerWithNoAssignments(): Observable<Marketer[]> {
    let url = `${this.baseURL}/api/v1/Marketers/GetMarketerWithNoTitles`;
    return this.http.get<Marketer[]>(url, this.httpOptions);
  }

  getMarketMaterialAssignments(
    bookId: number
  ): Observable<MarketMaterialAssignemnt> {
    let url = `${this.baseURL}/api/v1/Marketers/GetMarketMaterialAssignments/${bookId}`;
    return this.http.get<MarketMaterialAssignemnt>(url, this.httpOptions);
  }

  createMarketerAssignment(marketerAssignment: Object): Observable<Object> {
    let url = `${this.baseURL}/api/v1/Marketers/AddAnalystToTitle`;
    return this.http.post(`${url}`, marketerAssignment);
  }

  removeAnalystFromTitle(
    bookId: number,
    marketerId: number
  ): Observable<Object> {
    let url = `${this.baseURL}/api/v1/Marketers/RemoveAnalystFromTitle/${bookId}/${marketerId}`;
    return this.http.post(`${url}`, this.httpOptions);
  }

  getMarketMaterials(): Observable<MarketMaterial[]> {
    let url = `${this.baseURL}/api/v1/Marketers/GetMarketMaterials`;
    return this.http.get<MarketMaterial[]>(url);
  }

  createMarketMaterial(marketMaterial: Object): Observable<Object> {
    let url = `${this.baseURL}/api/v1/Marketers/AddMarketMaterial`;
    return this.http.post(`${url}`, marketMaterial);
  }

  createMarketMaterialAssignment(
    marketMaterialAssignment: Object
  ): Observable<Object> {
    let url = `${this.baseURL}/api/v1/Marketers/AddMarketMaterialAssignment`;
    return this.http.post(`${url}`, marketMaterialAssignment);
  }

  removeMarketMaterialAssignment(marketMaterialId: number): Observable<Object> {
    let url = `${this.baseURL}/api/v1/Marketers/RemoveMarketMaterialFromTitle/${marketMaterialId}`;
    return this.http.post(`${url}`, this.httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
