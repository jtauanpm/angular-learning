import { TestBed } from "@angular/core/testing";
import { ProductsService } from "./products.service"
import { Product } from "../../interfaces/product.interface";
import { Observable } from "rxjs";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe('ProductService', () => {
    let service: ProductsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [ProductsService, provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(ProductsService);
    });

    it('Deve retornar uma lista de produtos', () => {
        spyOn(service, "getProducts").and.returnValue(new Observable(subscriber => {
            subscriber.next(produtosFake);
            subscriber.complete();
        }));

        service.getProducts('promotional').subscribe((result) => {
            expect(result.length).toEqual(produtosFake.length);
            expect(result).toEqual(produtosFake);
        });
    });

    it("Deve retornar um produto", () => {
        spyOn(service, "getProductById").and.returnValue(new Observable(subscriber => {
            subscriber.next(produtoFake);
            subscriber.complete();
        }));

        service.getProductById(2).subscribe(result => {
            expect(result).toEqual(produtoFake);
            expect(result.id).toEqual(2);
        });
    });
})

const produtosFake: Product[] = [
  {
    id: 1,
    name: "Teste",
    promotional: true,
    value: 100,
    promotionalValue: 100,
    image: "celular.jpg",
  },
  {
    id: 2,
    name: "Teste 2",
    promotional: true,
    value: 200,
    promotionalValue: 200,
    image: "gopro.jpg",
  },
  {
    id: 3,
    name: "Teste 3",
    promotional: true,
    value: 300,
    promotionalValue: 300,
    image: "laptop.jpg",
  },
];

const produtoFake: Product = {
  id: 2,
  name: "Teste 2",
  promotional: true,
  value: 200,
  promotionalValue: 200,
  image: "gopro.jpg",
};