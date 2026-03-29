import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: '所属社区 ID', example: 1 })
  @Type(() => Number)
  @IsNumber()
  communityId: number;

  @ApiProperty({ description: '评论内容' })
  @IsString()
  @MaxLength(1000)
  content: string;

  @ApiProperty({ description: '评分 1-5', example: 4 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({ description: '标签列表', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: '图片地址数组', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ description: '视频地址数组', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];

  @ApiPropertyOptional({ description: '是否匿名', default: false })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isAnonymous?: boolean;
}
