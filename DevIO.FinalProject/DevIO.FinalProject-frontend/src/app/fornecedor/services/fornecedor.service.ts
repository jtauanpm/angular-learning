import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { Fornecedor } from '../models/fornecedor.model';
import { BaseService } from "../../services/base-api.service";
import { CepConsulta, Endereco } from "../models/endereco.model";

@Injectable({
    providedIn: 'root'
})
export class FornecedorService extends BaseService {

    fornecedor!: Fornecedor;

    constructor(private http: HttpClient) {
        super();
    
        this.fornecedor = {
            nome: "Teste Fake",
            documento: "32165498754",
            ativo: true,
            tipoFornecedor: 1
        } as Fornecedor;
    }

    obterTodos(): Observable<Fornecedor[]> {
        return this.http
            .get<Fornecedor[]>(this.UrlServiceV1 + "/fornecedores", this.obterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    obterPorId(id: string): Observable<Fornecedor> {
        return this.http
            .get<Fornecedor>(this.UrlServiceV1 + "/fornecedores/" + id, this.obterAuthHeaderJson())
            .pipe(catchError(super.serviceError));
    }

    novoFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        fornecedor.tipoFornecedor = Number(fornecedor.tipoFornecedor);
        return this.http
        .post<Fornecedor[]>(this.UrlServiceV1 + "/fornecedores", fornecedor, super.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }

    atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http
        .put<Fornecedor>(`${this.UrlServiceV1}/fornecedores/${fornecedor.id}`, fornecedor, super.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }

    excluirFornecedor(id: string): Observable<Fornecedor> {
        return new Observable<Fornecedor>();
    }
    
    consultarCep(cep: string): Observable<CepConsulta> {
        return this.http
            .get<CepConsulta>(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(catchError(super.serviceError));
    }

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        return this.http.put<Endereco>(`${this.UrlServiceV1}/fornecedores/endereco/${endereco.id}`, endereco, super.obterAuthHeaderJson())
        .pipe(
            map(super.extractData),
            catchError(super.serviceError));
    }
}
