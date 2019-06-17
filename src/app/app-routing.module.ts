import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mail',
    pathMatch: 'full'
  },
  {
    path: 'mail',
    loadChildren: () => import('./mail/mail.module').then(mail => mail.MailModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
