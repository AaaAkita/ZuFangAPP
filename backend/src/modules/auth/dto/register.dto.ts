import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: '手机号', example: '13800138000' })
  @IsString()
  @Matches(/^1[3-9]\d{9}$/, { message: '手机号格式不正确' })
  phone: string;

  @ApiProperty({ description: '密码', example: '12345678' })
  @IsString()
  @MinLength(6, { message: '密码长度不能少于 6 位' })
  password: string;

  @ApiPropertyOptional({ description: '昵称' })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: '昵称长度不能超过 50 个字符' })
  nickname?: string;
}
