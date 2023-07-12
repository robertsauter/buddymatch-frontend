import { inject } from "@angular/core";
import { AccountService } from "../services/account.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { catchError, map, of } from "rxjs";

// Every time a page with this guard is accessed, a request to the backend is made, to check, if the token is still valid
export const isLoggedInGuard = () => {
    const accountService = inject(AccountService);
    const userService = inject(UserService);
    const router = inject(Router);

    return userService.getUserById(accountService.userId$.value).pipe(
        map((user) => user ? true : router.parseUrl('/buddy-match/login')),
        catchError(() => of(router.parseUrl('/buddy-match/login')))
    );
}

// Same as above, just returns true, if the request gets an error (then the token is invalid or the user is not logged in)
export const isNotLoggedInGuard = () => {
    const accountService = inject(AccountService);
    const router = inject(Router);
    const userService = inject(UserService);

    return userService.getUserById(accountService.userId$.value).pipe(
        map((user) => user ? router.parseUrl('/buddy-match') : true),
        catchError(() => of(true))
    );
}