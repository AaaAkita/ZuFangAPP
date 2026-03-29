import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class QueryCommentDto extends PaginationDto {
  @ApiPropertyOptional({ description: '社区 ID', example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  communityId?: number;

  @ApiPropertyOptional({ description: '排序字段 createdAt/likeCount', default: 'createdAt' })
  @IsOptional()
  @IsIn(['createdAt', 'likeCount'])
  sortBy?: 'createdAt' | 'likeCount';

  @ApiPropertyOptional({ description: '排序方向 asc/desc', default: 'desc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}
