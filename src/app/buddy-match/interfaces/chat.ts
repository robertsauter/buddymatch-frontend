export interface Chat {
    _id: string;
    participants: string[];
    messages: {
        sender: string;
        content: string;
    }[];
}