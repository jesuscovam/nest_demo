export interface Palo {
    id: string;
    title: string;
    description: string;
    status: PaloStatus;
}

export enum PaloStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}