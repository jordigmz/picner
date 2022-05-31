import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgxMapboxGlGeocoderControlModule } from 'ngx-mapbox-gl-geocoder-control';
import { secretConstants } from 'src/secret';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptor';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    NgxMapboxGLModule.withConfig({
      accessToken: secretConstants.mapboxToken
    }),
    NgxMapboxGlGeocoderControlModule
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
