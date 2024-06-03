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
];
@NgModule({
  declarations: [],
  imports: [CommonModule, modPrime],
  exports: [modPrime],
})
export class PrimengModule {}
