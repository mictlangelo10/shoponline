import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/products`);
  }

  getOneProducto(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/products?id=${id}`);
  }

  addProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}/products`, producto);
  }

  deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${id}`);
  }

  updateProducto(
    idProducto: number,
    productoAct: Producto
  ): Observable<Producto> {
    return this.http.put<Producto>(
      `${this.baseUrl}/products/${idProducto}`,
      productoAct
    );
  }
}
