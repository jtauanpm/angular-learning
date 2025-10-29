import { Component } from '@angular/core';
import { TasksComponent } from './components/tasks/tasks.component';
import { TasksIniciadasComponent } from './components/tasks-iniciadas/tasks-iniciadas.component';
import { TasksFinalizadasComponent } from './components/tasks-finalizadas/tasks-finalizadas.component';

@Component({
  selector: "app-todo-list",
  imports: [TasksComponent, TasksIniciadasComponent, TasksFinalizadasComponent],
  templateUrl: "./todo.component.html"
})
export class TodoComponent {}