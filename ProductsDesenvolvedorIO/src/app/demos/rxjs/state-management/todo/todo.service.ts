import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoTask } from '../../../../interfaces/todo-task.interface';
import { environment } from '../../../../../../environment';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private baseUrl: string = `${environment.gatewayUrl}/todo-tasks`;

  constructor(private http: HttpClient) {}

  getToDoList(): Observable<TodoTask[]> {
    return this.http.get<TodoTask[]>(this.baseUrl);
  }
}