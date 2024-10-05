import { ApiProperty } from "@nestjs/swagger";
import { SignNewTokensInterface } from "../interfaces/sign-new-tokens.interface";

export class SignNewTokensDto implements SignNewTokensInterface {
    @ApiProperty({
        type: String, 
        description:"Bu yerga expired bo'lgan token kiritiladi!",
        minLength:12,
        required: true,
    })
    oldRefreshToken: string;
}