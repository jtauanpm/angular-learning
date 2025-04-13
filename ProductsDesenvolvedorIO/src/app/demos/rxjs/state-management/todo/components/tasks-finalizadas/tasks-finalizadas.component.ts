import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tasks-finalizadas',
  imports: [CommonModule, ToDoListComponent],
  templateUrl: './tasks-finalizadas.component.html'
})
export class TasksFinalizadasComponent implements OnInit {

  finalizados$!: Observable<any[]>;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.finalizados$ = this.tasksService.getToDoList();      
  }
}