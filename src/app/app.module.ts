import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';

import { ConfigService } from './features/services/config.service';
import { FilterPipe } from './features/pipes/filter.pipe';

import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TruncatePipe } from './features/pipes/truncate.pipe';
import { DetailsComponent } from './features/details/details.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './features/store/reducers/search.reducer';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FilterPipe,
    TruncatePipe,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ButtonModule,
    StoreModule.forRoot({
      search: reducer
    })
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
