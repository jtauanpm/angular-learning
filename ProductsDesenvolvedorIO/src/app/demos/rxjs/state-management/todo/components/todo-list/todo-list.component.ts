import { Component, input } from '@angular/core';
import { TodoTask } from '../../../../../../interfaces/todo-task.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'  
})
export class ToDoListComponent {
  public todoList = input.required<TodoTask[]>();
}