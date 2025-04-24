import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';

import { TasksService } from '../../todo.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../../../interfaces/task.interface';
import { Store } from '../../todo.store';

@Component({
  selector: "tasks",
  imports: [ToDoListComponent, 
    CommonModule
  ],
  // providers: [TasksService],
  templateUrl: "./tasks.component.html",
})
export class TasksComponent implements OnInit, OnDestroy {
  todolist$!: Observable<Task[]>;
  subscription!: Subscription;

  constructor(private taskService: TasksService, private store: Store) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.todolist$ = this.store.getTodoList().pipe(map(todolist => todolist.filter(task => !task.finalizado && !task.iniciado)));

    // utilizado para popular a store por meio do serviço
    this.subscription = this.taskService.getToDoList().subscribe();
  }
}