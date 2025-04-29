import { Component, input, output } from '@angular/core';
import { Task } from '../../../../../../interfaces/task.interface';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'  
})
export class ToDoListComponent {
  public todoList = input.required<Task[]>();
  public toggle = output<any>();

  public toggleItem(taskId: number, status: string){
    const task = this.todoList()[taskId];

    switch (status) {
      case "iniciar":
        task.finalizado = false;
        task.iniciado = true;
        break;
      case "finalizar":
        task.finalizado = true;
        task.iniciado = false;
        break;
      case "retomar":
        task.finalizado = false;
        task.iniciado = true;
        break;
      case "cancelar":
        task.finalizado = false;
        task.iniciado = false;
        break;
    }

    this.toggle.emit({
      task: { ...task }
    });
  }
}