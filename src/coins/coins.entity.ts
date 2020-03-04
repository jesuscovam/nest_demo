import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { CoinStatus } from "./coin.model";

@Entity()
export class Coin extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: CoinStatus
}