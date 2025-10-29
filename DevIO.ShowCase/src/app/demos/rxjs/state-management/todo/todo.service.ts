import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';
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

  toggle(event: any){
    this.http.put(`${this.baseUrl}/${event.task.id}`, event.task)
    .pipe(first())
    .subscribe(() => {

      const value = this.store.value.todolist;

      const todolist = value.map((task: Task) => {
        return event.task.id === task.id
          // atualiza de forma que adiciona todas as propriedade de
          // task e depois todas as de event.task, nesse caso o último valor com mesmo nome de propriedade vence
          ? { ...task, ...event.task }
          : task;
      });

      this.store.set('todolist', todolist);
    });
  }

  createTask(taskName: string){
    this.http.post(this.baseUrl, { nome: taskName } as Task)
    .pipe(first())
    .subscribe(() => {
      const value = this.store.value.todolist;

      value.push({ nome: taskName } as Task);

      this.store.set('todolist', value);
    });
  }
}