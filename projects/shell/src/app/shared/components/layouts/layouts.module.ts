import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GatewayLayoutComponent } from './gateway-layout/gateway-layout.component';
import { MainLayoutComponent } from './main-layout';
import { HeaderModule } from '../header';

@NgModule({
  declarations: [GatewayLayoutComponent, MainLayoutComponent],
  imports: [CommonModule, RouterModule.forChild([]), HeaderModule],
  exports: [GatewayLayoutComponent, MainLayoutComponent],
})
export class LayoutsModule {}
