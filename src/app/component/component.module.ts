import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';

import { UserComponent } from './user/user.component';
import { CreateditUserComponent } from './user/createdit-user/createdit-user.component';
import { ReportUserComponent } from './user/report-user/report-user.component';
import { TolistUserComponent } from './user/tolist-user/tolist-user.component';
import { ProductComponent } from './product/product.component';
import { CreateditProductComponent } from './product/createdit-product/createdit-product.component';
import { MessageComponent } from './message/message.component';
import { CreateditMessageComponent } from './message/createdit-message/createdit-message.component';
import { NotificationComponent } from './notification/notification.component';
import { CreateditNotificationComponent } from './notification/createdit-notification/createdit-notification.component';
import { CategoryComponent } from './category/category.component';
import { CreateditCategoryComponent } from './category/createdit-category/createdit-category.component';
import { CreateditRoleComponent } from './role/createdit-role/createdit-role.component';
import { RoleComponent } from './role/role.component';
import { ForumComponent } from './forum/forum.component';
import { CreateditForumComponent } from './forum/createdit-forum/createdit-forum.component';
import { CreateditRecordComponent } from './record/createdit-record/createdit-record.component';
import { RecordComponent } from './record/record.component';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TolistMessageComponent } from './message/tolist-message/tolist-message.component';
import { TolistNotificationComponent } from './notification/tolist-notification/tolist-notification.component';
import { TolistCategoryComponent } from './category/tolist-category/tolist-category.component';
import { TolistRoleComponent } from './role/tolist-role/tolist-role.component';
import { TolistForumComponent } from './forum/tolist-forum/tolist-forum.component';
import { TolistRecordComponent } from './record/tolist-record/tolist-record.component';
import { TolistProductComponent } from './product/tolist-product/tolist-product.component';
import { HomeComponent } from './home/home.component';
import { TripsComponent } from './trips/trips.component';
import { TolistTripsComponent } from './trips/tolist-trips/tolist-trips.component';
import { CreateditTripsComponent } from './trips/createdit-trips/createdit-trips.component';
import { ReportComponent } from './report/report.component';
import { TotalProductForUserComponent } from './report/total-product-for-user/total-product-for-user.component';
import { NgChartsModule } from 'ng2-charts';

import { DialogConfirmComponent } from './user/dialog-confirm/dialog-confirm.component';
import { MapachevereComponent } from './mapachevere/mapachevere.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatCardModule } from '@angular/material/card';
import { TotalTripsByUserComponent } from './report/total-trips-by-user/total-trips-by-user.component';
import { PointsByUserComponent } from './report/points-by-user/points-by-user.component';

import { QuantityMessageSendByUserComponent } from './report/quantity-message-send-by-user/quantity-message-send-by-user.component';
import { QuantityMessageReceiveByUserComponent } from './report/quantity-message-receive-by-user/quantity-message-receive-by-user.component';

import { ListPricesGreaterThan1000Component } from './report/list-prices-greater-than1000/list-prices-greater-than1000.component';



@NgModule({
  declarations: [
    UserComponent,
    TolistUserComponent,
    CreateditUserComponent,
    ProductComponent,
    TolistUserComponent,
    CreateditProductComponent,
    MessageComponent,
    TolistMessageComponent,
    CreateditMessageComponent,
    ReportUserComponent,
    NotificationComponent,
    CreateditNotificationComponent,
    TolistNotificationComponent,
    CategoryComponent,
    CreateditCategoryComponent,
    TolistCategoryComponent,
    RoleComponent,
    TolistRoleComponent,
    CreateditRoleComponent,
    ForumComponent,
    CreateditForumComponent,
    TolistForumComponent,
    RecordComponent,
    TolistRecordComponent,
    CreateditRecordComponent,
    TolistProductComponent,
    HomeComponent,
    TripsComponent,
    TolistTripsComponent,
    CreateditTripsComponent,
    ReportComponent,
    TotalProductForUserComponent,
    DialogConfirmComponent,
    MapachevereComponent,
    TotalTripsByUserComponent,
    PointsByUserComponent,
    QuantityMessageSendByUserComponent,
    QuantityMessageReceiveByUserComponent,
    ListPricesGreaterThan1000Component,
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatListModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    NgChartsModule,
    GoogleMapsModule
  ],
  providers: [CreateditUserComponent],
})
export class ComponentModule {}
