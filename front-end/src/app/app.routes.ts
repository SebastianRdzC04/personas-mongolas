import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { Authenticate } from './pages/authenticate/authenticate';
import { PeopleTable } from './pages/people-table/people-table';
import { PeopleStats } from './pages/people-stats/people-stats';
import { PeopleLogs } from './pages/people-logs/people-logs';
import { authGuard } from './guards/auth-guard';
import { noAuthGuard } from './guards/no-auth-guard';

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
        path: "people-logs",
        component: PeopleLogs,
        canActivate: [authGuard]
    },
    {
        path: "people-stats",
        component: PeopleStats,
        canActivate: [authGuard]
    },
    {
        path: "auth",
        component: Authenticate,
        canActivate: [noAuthGuard]
    }
];
