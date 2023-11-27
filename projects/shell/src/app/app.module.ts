import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthLibModule } from 'auth-lib';

import { environment } from '@environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from '@shared/shared.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import * as fromApp from '@shared/store/app.reducer';
import { AuthEffects, FilmEffects, RecipeEffects } from '@shared/store';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesRoutingModule,
    AuthLibModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, FilmEffects, RecipeEffects]), // Must add effects otherwise effects will not be triggered by actions
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    SharedModule,
    // CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
