import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { take } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verifyPhone(phone: string): Observable<any> {
    return this.http.post("http://localhost:3000/api/auth/verify", {phone}, {
      headers: new HttpHeaders({

      })
    }).pipe(
      take(1),
    )
  }

  getHistory(): Observable<any> {
    return this.http.get("http://localhost:3000/api/auth/history").pipe(take(1))
  }
}
