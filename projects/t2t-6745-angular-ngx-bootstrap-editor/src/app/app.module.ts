import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomCellEditorComponent } from './custom-cell-editor/custom-cell-editor.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  imports: [
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([CustomCellEditorComponent]),
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent, CustomCellEditorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}