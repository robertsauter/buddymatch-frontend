import { UserDetail } from "./user-detail";

export interface User {
    email: string;
    password: string;
    detail: UserDetail;
}
