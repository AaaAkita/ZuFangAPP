import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class QueryCommunityDto extends PaginationDto {
  @ApiPropertyOptional({ description: '关键词（名称/地址）' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ description: '城市' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: '区域' })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({ description: '经度' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ description: '纬度' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({
    description:
      '排序字段: ratingAvg/commentCount/createdAt/qualityScore/riskScore/viewCount',
  })
  @IsOptional()
  @IsString()
  @IsIn(['ratingAvg', 'commentCount', 'createdAt', 'qualityScore', 'riskScore', 'viewCount'])
  sortBy?: string;

  @ApiPropertyOptional({ description: '排序方向 asc/desc', default: 'desc' })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
