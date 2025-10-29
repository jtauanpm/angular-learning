import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environment";
import { Observable } from "rxjs";
import { Product } from "../../interfaces/product.interface";

@Injectable({providedIn: 'root'})
export class ProductsService {
  protected urlService: string = `${environment.gatewayUrl}/products`;

  constructor(private httpClient: HttpClient) {}

  getProducts(state: string): Observable<Product[]> {
    const url = state === "promotional"
        ? `${this.urlService}?promotional=true`
        : this.urlService;

    return this.httpClient.get<Product[]>(url);
  }

  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${this.urlService}/${id}`);
  }

  updateProduct(id: number, chnages: Partial<Product>): Observable<Product> {
    return this.httpClient.patch<Product>(`${this.urlService}/${id}`, chnages);
  }
}