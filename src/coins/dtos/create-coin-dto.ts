import { IsNotEmpty } from "class-validator";

export class CreateCoinDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}