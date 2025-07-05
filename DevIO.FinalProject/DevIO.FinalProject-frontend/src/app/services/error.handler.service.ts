import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { inject, Injectable } from "@angular/core";
import { LocalStorageUtils } from "../utils/local-storage";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    private router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError(error => {
                if(error instanceof HttpErrorResponse){
                    if(error.status === 401) {
                        LocalStorageUtils.limparDadosLocaisUsuario();
                        this.router.navigate(['/conta/login'], {
                            queryParams: { returnUrl: this.router.url },
                        });
                    }

                    if(error.status === 403) {
                        LocalStorageUtils.limparDadosLocaisUsuario();
                        this.router.navigate(['/acesso-negado']);
                    }
                }

                return throwError(() => error);
        }))
    }
}