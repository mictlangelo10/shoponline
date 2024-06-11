import { Component, ViewEncapsulation } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../servicios/productos.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent {
  productos: Producto[] = [];
  displayAddProductDialog: boolean = false;
  displayEditProductDialog: boolean = false;
  newProductForm: FormGroup;
  editProductForm: FormGroup;
  selectedProduct: Producto = {} as Producto;
  selectedFile: File | null = null;
  selectedFileName: string = '';

  estadosInventario: any[] = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' },
  ];

  constructor(
    private productosService: ProductosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.newProductForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      estadoInventario: ['', Validators.required],
      rating: [0],
    });

    this.editProductForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      categoria: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      estadoInventario: ['', Validators.required],
      rating: [0],
    });
  }

  ngOnInit() {
    this.loadProductos();
  }

  getSeverity(
    status: string
  ):
    | 'success'
    | 'secondary'
    | 'info'
    | 'warning'
    | 'danger'
    | 'contrast'
    | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  loadProductos(): void {
    this.productosService.getProductos().subscribe(
      (data: Producto[]) => (this.productos = data),
      (error) => console.error(error)
    );
  }

  showAddProductDialog(): void {
    this.newProductForm.reset(); // Reiniciar el formulario
    this.displayAddProductDialog = true;
  }
  addProduct(): void {
    if (this.newProductForm.valid) {
      const newProduct: Producto = this.newProductForm.value;
      this.productosService.addProducto(newProduct).subscribe(
        (producto: Producto) => {
          this.productos.push(producto);
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Producto agregado exitosamente',
          });
          this.displayAddProductDialog = false;
          this.clearFileInput(); // Limpia el input de archivo
          this.newProductForm.reset(); // Reiniciar el formulario
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo agregar el producto',
          });
        }
      );
    }
  }

  showEditProductDialog(producto: Producto): void {
    // Clonamos el producto seleccionado para evitar modificarlo directamente
    this.selectedProduct = { ...producto };

    // Llenamos el formulario de edición con los datos del producto seleccionado
    this.editProductForm.patchValue({
      codigo: this.selectedProduct.codigo,
      nombre: this.selectedProduct.nombre,
      descripcion: this.selectedProduct.descripcion,
      precio: this.selectedProduct.precio,
      imagen: this.selectedProduct.imagen,
      categoria: this.selectedProduct.categoria,
      cantidad: this.selectedProduct.cantidad,
      estadoInventario: this.selectedProduct.estadoInventario,
      rating: this.selectedProduct.rating,
    });

    // Mostramos el modal de edición
    this.displayEditProductDialog = true;
  }

  updateProduct(): void {
    if (this.editProductForm.valid) {
      const updatedProduct: Producto = this.editProductForm.value;
      this.productosService
        .updateProducto(this.selectedProduct.id, updatedProduct)
        .subscribe(
          (producto: Producto) => {
            const index = this.productos.findIndex(
              (p) => p.id === this.selectedProduct.id
            );
            if (index !== -1) {
              this.productos[index] = producto;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Producto actualizado exitosamente',
            });
            this.displayEditProductDialog = false;
            this.clearFileInput(); // Limpia el input de archivo
            this.editProductForm.reset(); // Opcional: resetear el formulario si es necesario
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo actualizar el producto',
            });
          }
        );
    }
  }

  confirmDeleteProducto(event: Event, id: number): void {
    if (event.target) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: '¿Está seguro de que desea eliminar este producto?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sí',
        rejectLabel: 'No',
        accept: () => {
          this.deleteProduct(id);
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Cancelado',
            detail: 'Eliminación cancelada',
          });
        },
      });
    }
  }

  deleteProduct(id: number): void {
    this.productosService.deleteProducto(id).subscribe(
      () => {
        this.productos = this.productos.filter((p) => p.id !== id);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'El producto se ha eliminado correctamente',
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se ha podido eliminar el producto',
        });
      }
    );
  }

  onFileSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length) {
      const file = files[0];
      this.selectedFileName = file.name; // Actualiza el nombre del archivo seleccionado
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result as string;
        // Asigna la imagen en base64 al campo correspondiente en el formulario
        if (this.displayAddProductDialog) {
          this.newProductForm.patchValue({
            imagen: base64Image,
          });
        } else if (this.displayEditProductDialog) {
          this.editProductForm.patchValue({
            imagen: base64Image,
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      // Limpia el nombre del archivo si no hay archivo seleccionado
      this.selectedFileName = '';
    }
  }
  clearFileInput(): void {
    this.selectedFileName = ''; // Limpia el nombre de archivo seleccionado
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Limpia el input de archivo para permitir la misma selección de archivo nuevamente
    }
  }
}
