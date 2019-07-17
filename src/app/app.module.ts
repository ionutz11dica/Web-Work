import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { SearchComponent } from './features/search/search.component';

import { ConfigService } from './features/services/config.service';
import { FilterPipe } from './features/pipes/filter.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {TabMenuModule} from 'primeng/tabmenu';

import { TruncatePipe } from './features/pipes/truncate.pipe';
import { DetailsComponent } from './features/details/details.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from './features/store/reducers/search.reducer';

import {FileUploadModule} from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import { NavbarComponent } from './features/navbar/navbar.component';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './features/store/effects/search.effects';
import { LoginComponent } from './features/login/login.component';
import { MaterialModule } from 'src/app/material.module';
import { BookListComponent } from './features/book-list/book-list.component';
import { DeleteModalComponent } from './features/delete-modal/delete-modal.component';
// import { fakeBackendProvider } from './helpers';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { ChartModule } from 'angular-highcharts';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    FilterPipe,
    TruncatePipe,
    DetailsComponent,
    NavbarComponent,
    LoginComponent,
    BookListComponent,
    DeleteModalComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CardModule,
    ButtonModule,
    TabMenuModule,
    FileUploadModule,
    InputTextModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartModule,
    NgbModule,
    EffectsModule.forRoot([SearchEffects]),
    StoreModule.forRoot({
      search: reducer
    })
  ],
  providers: [ConfigService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents:[DeleteModalComponent]
})
export class AppModule { }
