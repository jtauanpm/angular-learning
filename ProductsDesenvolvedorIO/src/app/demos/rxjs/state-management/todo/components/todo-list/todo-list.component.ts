import { Component, input } from '@angular/core';
import { Task } from '../../../../../../interfaces/task.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'  
})
export class ToDoListComponent {
  public todoList = input.required<Task[]>();
}