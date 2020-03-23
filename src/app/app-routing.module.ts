import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QwixxComponent } from './views/qwixx/qwixx.component';


const routes: Routes = [
  { path: '', component: QwixxComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
