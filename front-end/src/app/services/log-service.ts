import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export interface Log {
  id: number;
  action: string;
  description: string;
  createdAt: string;
}

export interface LogResponse {
  message: string;
  logs: Log[];
}


@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3333/people/logs';
  private http = inject(HttpClient);

  constructor() { }

  getAllLogs() {
    return this.http.get<LogResponse>(this.apiUrl);
  }


}
