import { Messages } from './../features/messages/messages';
import { Lists } from './../features/lists/lists';
import { MemberDetailed } from './../features/members/member-detailed/member-detailed';
import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { NotFound } from '../shared/errors/not-found/not-found';

export const routes: Routes = [
    {path:'',component:Home},
        {
        path:'',
        runGuardsAndResolvers:'always',
        canActivate:[authGuard],
        children:[
            {path: 'members', component:MemberList},
            {path: 'members/:username', component:MemberDetailed},
            {path: 'lists', component:Lists},
            {path: 'messages', component:Messages},
        
        ]
    },
    {path:'errors',component:TestErrors},
    {path:'**',component:NotFound}
    
];
