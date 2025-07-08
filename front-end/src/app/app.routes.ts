import { Routes } from '@angular/router';
import { Index } from './pages/index';
import { Authenticate } from './pages/authenticate/authenticate';

export const routes: Routes = [
    {
        path: "",
        component: Index
    },
    {
        path: "auth",
        component: Authenticate
    }
];
