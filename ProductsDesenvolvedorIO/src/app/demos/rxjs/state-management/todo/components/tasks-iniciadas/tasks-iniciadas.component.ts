import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';
import { CommonModule } from '@angular/common';
import { ToDoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'tasks-iniciadas',
  imports: [CommonModule, ToDoListComponent],
  templateUrl: './tasks-iniciadas.component.html'
})
export class TasksIniciadasComponent implements OnInit {

  iniciados$!: Observable<any[]>;

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.iniciados$ = this.tasksService.getToDoList();
  }
}