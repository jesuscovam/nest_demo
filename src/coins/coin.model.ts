export interface Coin{
    id: string,
    title: string,
    description: string,
    status: CoinStatus
}

export enum CoinStatus {
    OPEN = "OPEN",
    DONE = "DONE",
    IN_PROGRESS = "DONE"
}