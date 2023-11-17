import { TolistTripsComponent } from './trips/tolist-trips/tolist-trips.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateditUserComponent } from './user/createdit-user/createdit-user.component';
import { UserComponent } from './user/user.component';
import { ReportUserComponent } from './user/report-user/report-user.component';
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
import { HomeComponent } from './home/home.component';
import { CreateditTripsComponent } from './trips/createdit-trips/createdit-trips.component';
import { TripsComponent } from './trips/trips.component';
import { ReportComponent } from './report/report.component';
import { TotalProductForUserComponent } from './report/total-product-for-user/total-product-for-user.component';

import { MapachevereComponent } from './mapachevere/mapachevere.component';
import { TotalTripsByUserComponent } from './report/total-trips-by-user/total-trips-by-user.component';
import { PointsByUserComponent } from './report/points-by-user/points-by-user.component';
import { ListPricesGreaterThan1000Component } from './report/list-prices-greater-than1000/list-prices-greater-than1000.component';
import { QuantityMessageReceiveByUserComponent } from './report/quantity-message-receive-by-user/quantity-message-receive-by-user.component';
import { QuantityMessageSendByUserComponent } from './report/quantity-message-send-by-user/quantity-message-send-by-user.component';
import { StartComponent } from '../pages/start/start.component';

const routes: Routes = [
  {
    path: 'Users',
    component: UserComponent,
    children: [
      { path: 'new', component: CreateditUserComponent },
      { path: 'edition/:id', component: CreateditUserComponent },
      { path: 'search', component: ReportUserComponent },
    ],
  },
  {
    path: 'Products',
    component: ProductComponent,
    children: [
      { path: 'new', component: CreateditProductComponent },
      { path: 'edition/:id', component: CreateditProductComponent },
    ],
  },
  {
    path: 'Trips',
    component: TripsComponent,
    children: [
      { path: 'new', component: CreateditTripsComponent },
      { path: 'edition/:id', component: CreateditTripsComponent },
  ],
  },
  {
    path: 'Messages',
    component: MessageComponent,
    children: [
      { path: 'new', component: CreateditMessageComponent },
      { path: 'edition/:id', component: CreateditMessageComponent },
    ],
  },
  {
    path: 'Notifications',
    component: NotificationComponent,
    children: [
      { path: 'new', component: CreateditNotificationComponent },
      { path: 'edition/:id', component: CreateditNotificationComponent },
    ],
  },
  {
    path: 'Categories',
    component: CategoryComponent,
    children: [
      { path: 'new', component: CreateditCategoryComponent },
      { path: 'edition/:id', component: CreateditCategoryComponent },
  ],
  },
  {
    path: 'Roles',
    component: RoleComponent,
    children: [
      { path: 'new', component: CreateditRoleComponent },
      { path: 'edition/:id', component: CreateditRoleComponent },
  ],
  },
  {
    path: 'Forums',
    component: ForumComponent,
    children: [
      { path: 'new', component: CreateditForumComponent },
      { path: 'edition/:id', component: CreateditForumComponent },
  ],
  },
  {
    path: 'Records',
    component: RecordComponent,
    children: [
      { path: 'new', component: CreateditRecordComponent },
      { path: 'edition/:id', component: CreateditRecordComponent },
    ],
  },
  {
    path: 'Home',
    component: HomeComponent,
    children: [ {path:'#carousel',component: StartComponent}]
  },
  {
    path:'reports', 
    component:ReportComponent,
    children:[
      { path: 'query01', component: TotalProductForUserComponent },
      { path: 'query02', component: TotalTripsByUserComponent },
      { path: 'queery03', component: PointsByUserComponent },
      { path: 'query04', component: ListPricesGreaterThan1000Component },
      { path: 'query05', component: QuantityMessageReceiveByUserComponent },
      { path: 'query06', component: QuantityMessageSendByUserComponent },
    ],

  },
  {
    path: 'maps',
    component: MapachevereComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentRoutingModule {}
