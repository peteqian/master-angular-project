import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GatewayLayoutComponent } from '@shared/components/layouts';
import { GenericErrorComponent } from './generic-error';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { MainLayoutComponent } from '@shared/components/layouts/main-layout';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'films',
    loadChildren: () =>
      import('./films/films.module').then((m) => m.FilmsModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),
  },
  {
    path: 'reactive-forms',
    loadChildren: () =>
      import('./reactive-forms/reactive-forms.module').then(
        (m) => m.ReactiveFormModule
      ),
  },
  {
    path: 'template-forms',
    loadChildren: () =>
      import('./template-forms/template-forms.module').then(
        (m) => m.TemplateFormsModule
      ),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./profile/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'mfe1',
    component: MainLayoutComponent,
    data: {
      title: 'Shell Application',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './FlightsModule', // <-- Name of the exposed module
          }).then((m) => m.FlightsModule),
      },
    ],
  },
  {
    path: '',
    component: GatewayLayoutComponent,
    children: [
      {
        path: 'not-found',
        component: GenericErrorComponent,
        data: {
          title: 'Page Not Found',
          text: 'The page you are looking for does not exist.',
        },
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
