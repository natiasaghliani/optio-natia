import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(url);
  }

  public post(url: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiJpbnRlcm5zaGlwIiwiaW50ZXJuc2hpcElkIjoibmF0aWFzYWdobGlhbmkwQGdtYWlsLmNvbSIsImlhdCI6MTY5NjY1MDgyMiwiZXhwIjoxNjk3NTE0ODIyfQ.sgbOx-HiO6uLQlqCqhtAI9E0UGgUH_XxPPf-Pp1My0NJfxy5bzBvWYnxXDWQIuQ_bYea4K9HrfkbY7t-w_8nMg'
      })
    };
    
    return this.http.post(url, data, httpOptions);
  }
}
