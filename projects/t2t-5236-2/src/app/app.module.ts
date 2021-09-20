import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { ToggleSwitchRenderer } from './toggle-switch-renderer.component';

@NgModule({
  exports: [
    MatSlideToggleModule,
    MatSliderModule,
  ]
})
export class MaterialModule { }

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    AgGridModule.withComponents([ToggleSwitchRenderer]),
  ],
  declarations: [AppComponent, ToggleSwitchRenderer],
  bootstrap: [AppComponent],
})
export class AppModule { }
