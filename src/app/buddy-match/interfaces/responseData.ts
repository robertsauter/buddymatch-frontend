import { Type } from "@angular/core";

export interface ResponseData<Type> {
    isSuccess: boolean;
    data?: Type;
}