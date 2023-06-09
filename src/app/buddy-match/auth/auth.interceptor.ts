import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "../services/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    // Makes sure, that the authorization token is sent on every outgoing request
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.accountService.token$.value;
        if(token === '') {
            this.accountService.logout();
            return next.handle(req);
        }

        const newReq = req.clone({ headers: req.headers.set('authorization', `Bearer ${ token }`) });
        return next.handle(newReq);
    }
}