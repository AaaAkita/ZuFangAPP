import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: '手机号', example: '13800138000' })
    @IsString()
    @MinLength(11, { message: '手机号格式不正确' })
    @MaxLength(11, { message: '手机号格式不正确' })
    phone: string;

    @ApiProperty({ description: '密码', example: '12345678' })
    @IsString()
    @MinLength(6, { message: '密码不能少于6位' })
    password: string;
}
