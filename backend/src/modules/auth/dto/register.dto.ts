import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ description: '手机号', example: '13800138000' })
    @IsString()
    @MinLength(11, { message: '手机号格式不正确' })
    @MaxLength(11, { message: '手机号格式不正确' })
    phone: string;

    @ApiProperty({ description: '密码', example: '12345678' })
    @IsString()
    @MinLength(6, { message: '密码不能少于6位' })
    password: string;

    @ApiProperty({ description: '昵称', required: false, example: '张三' })
    @IsString()
    @IsOptional()
    @MaxLength(50, { message: '昵称太长' })
    nickname?: string;
}
