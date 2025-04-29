import { BehaviorSubject, map, Observable } from "rxjs";
import { Task } from "../../../../interfaces/task.interface";
import { Injectable } from "@angular/core";

export interface State {
  todolist: Task[]
}

const state: State = {
  todolist: []
}

@Injectable({ providedIn: "root" })
export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable();

  get value() {
    return this.subject.value;
  }

  public getTodoList(): Observable<Task[]> {
    return this.store.pipe(map(store => store.todolist));
  }

  set(name: string, state: any) {
    this.subject.next({
      ...this.value,
      [name]: state
    });
  }
}