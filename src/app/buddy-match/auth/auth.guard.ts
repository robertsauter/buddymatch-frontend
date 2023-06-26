import { inject } from "@angular/core";
import { AccountService } from "../services/account.service";
import { Router } from "@angular/router";

export const isLoggedInGuard = () => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    if(accountService.checkIfUserIsLoggedIn()) {
        return true;
    }
    return router.parseUrl('/buddy-match/login');
}

export const isNotLoggedInGuard = () => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    if(!accountService.checkIfUserIsLoggedIn()) {
        return true;
    }
    return router.parseUrl('/buddy-match');
}