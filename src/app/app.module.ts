import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SliderService } from './slider/slider.service';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SliderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
