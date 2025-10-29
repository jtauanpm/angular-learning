import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, Observer } from 'rxjs';
import { TasksService } from './todo.service';
import { Store } from './todo.store';
import { Task } from '../../../../interfaces/task.interface';

const todolist: Task[] = [{ "id": "1", "nome": "Responder e-mails", "finalizado": true, "iniciado": false }];

function createResponse(body: any) {
    return new Observable((observer: Observer<any>) => {
        observer.next(body);
    });
}

class MockHttp {
    get() {
        return createResponse(todolist);
    }
}

describe('TasksService', () => {

    let service: TasksService;
    let http: HttpClient;

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useClass: MockHttp },
                TasksService,
                Store
            ]
        });
        http = bed.inject(HttpClient);
        service = bed.inject(TasksService);
    });

    it('Deve retornar lista de tarefas', () => {
        service.getToDoList()
            .subscribe((result) => {
                expect(result.length).toBe(1);

                expect(result).toEqual(todolist);
            });
    });

});