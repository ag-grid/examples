import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { DetailCellRenderer } from './detail-cell-renderer.component';
import { MasterCellRenderer } from './masterCellRenderer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([DetailCellRenderer, MasterCellRenderer]),
  ],
  declarations: [AppComponent, DetailCellRenderer, MasterCellRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
