export interface Match {
    _id: string;
    sender: string;
    acceptor: string;
    accepted: boolean;
    matchDate: Date;
}