import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';
import { ToDoListComponent } from '../todo-list/todo-list.component';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../../../interfaces/task.interface';

@Component({
  selector: "tasks",
  imports: [ToDoListComponent, 
    CommonModule
  ],
  // providers: [TasksService],
  templateUrl: "./tasks.component.html",
})
export class TasksComponent implements OnInit {
  todolist$!: Observable<Task[]>;

  constructor(private taskService: TasksService) {}

  ngOnInit() {
    this.todolist$ = this.taskService.getToDoList();
  }
}