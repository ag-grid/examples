import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { ToggleSwitchRenderer } from './toggle-switch-renderer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([ToggleSwitchRenderer]),
  ],
  declarations: [AppComponent, ToggleSwitchRenderer],
  bootstrap: [AppComponent],
})
export class AppModule { }
