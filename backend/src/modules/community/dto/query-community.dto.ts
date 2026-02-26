import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Type } from 'class-transformer';

export class QueryCommunityDto extends PaginationDto {
    @ApiProperty({ description: '关键字搜索（名称、地址等）', required: false })
    @IsString()
    @IsOptional()
    keyword?: string;

    @ApiProperty({ description: '城市', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: '区县', required: false })
    @IsString()
    @IsOptional()
    district?: string;

    @ApiProperty({ description: '经度', required: false })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @ApiProperty({ description: '纬度', required: false })
    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiProperty({ description: '排序字段: ratingAvg, commentCount 等', required: false })
    @IsString()
    @IsOptional()
    sortBy?: string;

    @ApiProperty({ description: '排序方式: desc 或 asc', required: false })
    @IsString()
    @IsOptional()
    order?: 'asc' | 'desc';
}
