import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { Authenticate } from './pages/authenticate/authenticate';
import { PeopleTable } from './pages/people-table/people-table';
import { PeopleStats } from './pages/people-stats/people-stats';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "",
        component: Index,
        canActivate: [authGuard]
    },
    {
        path: "people-table",
        component: PeopleTable,
        canActivate: [authGuard]

    },
    {
        path: "people-stats",
        component: PeopleStats,
        canActivate: [authGuard]
    },
    {
        path: "auth",
        component: Authenticate
    }
];
