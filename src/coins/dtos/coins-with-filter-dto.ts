import { CoinStatus } from "../coin.model";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class CoinsWithFilterDto {
    @IsOptional()
    @IsNotEmpty()
    search: string;

    @IsOptional()
    @IsIn([...Object.values(CoinStatus)])
    status: CoinStatus;
}