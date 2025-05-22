import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Usuario } from "../models/usuario.interface";
import { catchError, map, Observable } from "rxjs";
import { BaseService } from "../../services/base-api.service";

@Injectable({
    providedIn: 'root'
})
export class ContaService extends BaseService {
    private httpClient = inject(HttpClient);

    registrarUsuario(usuario: Usuario): Observable<Usuario> {
        return this.httpClient
        .post<Usuario>(`${this.UrlServiceV1}/nova-conta`, 
            usuario, this.obterHeaders()
        )
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );
    }

    login(usuario: Usuario): Observable<Usuario> {
        return this.httpClient
        .post<Usuario>(`${this.UrlServiceV1}/entrar`, 
            usuario, this.obterHeaders()
        )
        .pipe(
            map(this.extractData),
            catchError(this.serviceError)
        );
    }
}
