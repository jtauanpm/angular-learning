import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Observable } from "rxjs";
import { Product } from "./products.interface";

@Injectable()
export class ProductsService {
  protected urlService: string = `${environment.gatewayUrl}/products`;

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.urlService);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.urlService}/${id}`);
  }
}