import { Routes } from '@angular/router';
import { OverviewComponent } from '../pages/overview/overview.component';
import { ResultsComponent } from '../pages/results/results.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'overview/1',
        pathMatch: 'full',
    },
    {
        path: 'overview',
        redirectTo: 'overview/1',
    },
    {
        path: 'overview/:page',
        component: OverviewComponent,
    },

    {
        path: 'bookmark/:id',
        component: ResultsComponent,
    },
    { path: '**', redirectTo: 'overview/1', pathMatch: 'full' },
];
