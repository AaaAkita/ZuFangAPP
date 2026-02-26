import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class QueryCommentDto extends PaginationDto {
    @ApiProperty({ description: '目标小区 ID', required: false, example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    communityId?: number;
}
