import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import{MatNativeDateModule} from '@angular/material/core'
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import{ReactiveFormsModule,FormsModule} from '@angular/forms'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import{MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import{MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './component/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateditUserComponent } from './component/user/createdit-user/createdit-user.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopSingleComponent } from './pages/shop-single/shop-single.component';
import { ShopComponent } from './pages/shop/shop.component';
import { StartComponent } from './pages/start/start.component';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    ContactComponent,
    ShopSingleComponent,
    ShopComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,    
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatCardModule,
    MatDialogModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
