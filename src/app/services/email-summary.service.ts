import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface SummaryResponse {
  summary: string[];
}

@Injectable({
  providedIn: 'root',
})
export class EmailSummaryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/summarize';

  summarize(email: string): Observable<SummaryResponse> {
    return this.http.post<SummaryResponse>(this.apiUrl, { email });
  }
}
