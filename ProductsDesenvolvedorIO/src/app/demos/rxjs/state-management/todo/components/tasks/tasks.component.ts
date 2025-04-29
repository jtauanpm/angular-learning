import { Component, model, OnDestroy, OnInit, signal } from '@angular/core';
import { first, map, Observable, Subscription } from 'rxjs';

import { TasksService } from '../../todo.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../../../interfaces/task.interface';
import { Store } from '../../todo.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "tasks",
  imports: [ToDoListComponent, CommonModule, FormsModule],
  // providers: [TasksService],
  templateUrl: "./tasks.component.html",
})
export class TasksComponent implements OnInit, OnDestroy {
  todolist$!: Observable<Task[]>;
  newTaskField = signal<string>("");
  subscription!: Subscription;

  constructor(private taskService: TasksService, private store: Store) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.todolist$ = this.store
      .getTodoList()
      .pipe(
        map((todolist) =>
          todolist.filter((task) => !task.iniciado && !task.finalizado)
        )
      );

    // utilizado para popular a store por meio do serviço
    this.subscription = this.taskService.getToDoList().subscribe();
  }

  onToggle(event: any) {
    this.taskService.toggle(event);
  }

  addTask() {
    if (!this.newTaskField().trim()) 
      return;

    console.log(this.newTaskField());
    this.taskService.createTask(this.newTaskField());
  }
}