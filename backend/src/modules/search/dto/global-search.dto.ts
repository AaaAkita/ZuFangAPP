import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class GlobalSearchDto extends PaginationDto {
  @ApiProperty({ description: '搜索关键词', example: '万科' })
  @IsString()
  @MinLength(1)
  keyword: string;

  @ApiPropertyOptional({ description: '城市筛选' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({
    description: '排序类型 default/hot/new/risk',
    default: 'default',
  })
  @IsOptional()
  @IsString()
  @IsIn(['default', 'hot', 'new', 'risk'])
  sort?: string = 'default';
}
