import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Task } from '../../../../interfaces/task.interface';
import { environment } from '../../../../../../environment';
import { Store } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private baseUrl: string = `${environment.gatewayUrl}/todo-tasks`;

  constructor(private http: HttpClient, private store: Store) {}

  getToDoList(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl)
    .pipe(tap(next => this.store.set('todolist', next)));
  }
}