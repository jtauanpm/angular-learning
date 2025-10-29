import { Component, OnInit } from '@angular/core';

import { map, Observable } from 'rxjs';

import { TasksService } from '../../todo.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { Store } from '../../todo.store';

@Component({
  selector: "tasks-finalizadas",
  imports: [CommonModule, ToDoListComponent],
  templateUrl: "./tasks-finalizadas.component.html",
})
export class TasksFinalizadasComponent implements OnInit {
  finalizados$!: Observable<any[]>;

  constructor(private tasksService: TasksService, private store: Store) {}

  ngOnInit() {
    this.finalizados$ = this.store
      .getTodoList()
      .pipe(map((todolist) => todolist.filter((task) => task.finalizado)));
  }

  onToggle(event: any) {
    this.tasksService.toggle(event);
  }
}