import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../../../interfaces/task.interface';
import { environment } from '../../../../../../environment';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private baseUrl: string = `${environment.gatewayUrl}/todo-tasks`;

  constructor(private http: HttpClient) {}

  getToDoList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
}