import { Message } from "./message";

export interface Chat {
    _id: string;
    participants: string[];
    messages: Message[];
}