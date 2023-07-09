import { UserDetail } from "./user-detail";

export interface User {
    _id?: string;
    email: string;
    password: string;
    detail: UserDetail;
}
