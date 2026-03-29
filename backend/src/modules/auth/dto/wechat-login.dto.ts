import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WechatUserInfoDto {
  @ApiPropertyOptional({ description: '微信昵称' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  nickname?: string;

  @ApiPropertyOptional({ description: '头像地址' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  avatar?: string;

  @ApiPropertyOptional({ description: '性别，0未知/1男/2女' })
  @IsOptional()
  @IsInt()
  gender?: number;

  @ApiPropertyOptional({ description: '省份' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  province?: string;

  @ApiPropertyOptional({ description: '城市' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  city?: string;
}

export class WechatLoginDto {
  @ApiProperty({ description: 'wx.login 返回的 code' })
  @IsString()
  @MinLength(6)
  @MaxLength(256)
  @Matches(/^[A-Za-z0-9_-]+$/, { message: 'invalid wechat code' })
  code: string;

  @ApiPropertyOptional({ description: '前端上送的微信用户信息' })
  @IsOptional()
  @ValidateNested()
  @Type(() => WechatUserInfoDto)
  userInfo?: WechatUserInfoDto;
}
