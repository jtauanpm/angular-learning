import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: "app-rxjs",
  imports: [],
  template: ` <h1>Welcome to {{ title }}!</h1> `,
})
export class RXJSComponent implements OnInit {
  title = "RXJS";

  private observerTipada: Observer<Usuario> = {
    next: (valor) => console.log("Next:", valor),
    error: (erro) => console.log("erro:", erro),
    complete: () => console.log("FIM!"),
  };

  ngOnInit(): void {
    this.minhaPromise("Lennon")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // Sempre executado do 0 ao ter um novo subscribe (lazy)
    const obs$ = this.minhaObservable("John");

    obs$.subscribe((valor) => console.log("Subscriber 1:", valor));
    obs$.subscribe((valor) => console.log("Subscriber 2:", valor));

    this.minhaObservable("").subscribe({
      next: (result) => console.log(result),
      error: (err) => console.log(err),
    });

    obs$.subscribe({
      next: (valor) => console.log("Next:", valor),
      error: (erro) => console.log("erro:", erro),
      complete: () => console.log("FIM!"),
    });

    const obsTipada$ = this.minhaObservableTipada("Admin", "admin@email.com");
    const subs = obsTipada$.subscribe(this.observerTipada);

    setTimeout(() => {
      subs.unsubscribe();
      console.log("Conexão fechada: " + subs.closed);
    }, 3500);
  }

  // A promise recebe uma função executora que recebe resolve e reject como argumentos
  // O JavaScript é quem define e injeta resolve e reject automaticamente para nós, que só as utilizamos conforme nossa lógica
  minhaPromise(nome: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (nome === "John") {
        setTimeout(() => {
          resolve("Seja bem vindo " + nome);
        }, 1000);
      } else {
        reject("Promise: Ops! Você não é o John");
      }
    });
  }

  // O subscriber é fornecido automaticamente pelo RxJS e é responsável por receber os valores emitidos
  minhaObservable(nome: string): Observable<string> {
    return new Observable((subscriber) => {
      if (nome == "John") {
        subscriber.next("Olá " + nome);
      } else {
        // Não emite mais após o erro
        subscriber.error("Observable: Ops! Você não é o John");
      }
      subscriber.next("Hello World!");
      setTimeout(() => subscriber.next("Com delay"), 1000);
      // Encerra o observable
      subscriber.complete();
    });
  }

  minhaObservableTipada(nome: string, email: string): Observable<Usuario> {
    return new Observable((subscriber) => {
      if (nome === "Admin") {
        let usuario = new Usuario(nome, email);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 1000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 2000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 3000);

        setTimeout(() => {
          subscriber.next(usuario);
        }, 4000);

        setTimeout(() => {
          subscriber.complete();
        }, 5000);
      } else {
        subscriber.error("Usuário não é admin");
      }
    });
  }
}

class Usuario {
  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  nome: string;
  email: string;
}
