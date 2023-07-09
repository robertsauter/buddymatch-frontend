import { inject } from "@angular/core";
import { AccountService } from "../services/account.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { catchError, map, of } from "rxjs";

export const isLoggedInGuard = () => {
    const accountService = inject(AccountService);
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUserById(accountService.userId$.value).pipe(
        map((user) => user ? true : router.parseUrl('/buddy-match/login')),
        catchError(() => of(router.parseUrl('/buddy-match/login')))
    );
}

export const isNotLoggedInGuard = () => {
    const accountService = inject(AccountService);
    const router = inject(Router);
    const userService = inject(UserService);

    return userService.getUserById(accountService.userId$.value).pipe(
        map((user) => user ? router.parseUrl('/buddy-match') : true),
        catchError(() => of(true))
    );
}