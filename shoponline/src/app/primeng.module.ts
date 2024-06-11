import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { DropdownModule } from 'primeng/dropdown';
// Modulos PrimeNG
const modPrime: any = [
  AvatarModule,
  ButtonModule,
  MenubarModule,
  ToolbarModule,
  MenuModule,
  TooltipModule,
  CardModule,
  InputTextModule,
  ButtonModule,
  ToastModule,
  InputTextareaModule,
  ConfirmPopupModule,
  DialogModule,
  ImageModule,
  FileUploadModule,
  TableModule,
  RatingModule,
  TagModule,
  DropdownModule,
];
@NgModule({
  declarations: [],
  imports: [CommonModule, modPrime],
  exports: [modPrime],
})
export class PrimengModule {}
