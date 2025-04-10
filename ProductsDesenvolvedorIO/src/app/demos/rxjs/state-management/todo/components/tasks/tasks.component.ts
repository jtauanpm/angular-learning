import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { TodoTask } from '../../../../../../interfaces/todo-task.interface';

@Component({
  selector: "tasks",
  imports: [ToDoListComponent, 
    CommonModule
  ],
  // providers: [TasksService],
  templateUrl: "./tasks.component.html",
})
export class TasksComponent implements OnInit {
  todolist$!: Observable<TodoTask[]>;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.todolist$ = this.taskService.getToDoList();
  }
}