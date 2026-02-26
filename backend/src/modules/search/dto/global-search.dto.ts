import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class GlobalSearchDto extends PaginationDto {
    @ApiProperty({ description: '搜索关键字', required: true, example: '万科' })
    @IsString()
    keyword: string;

    @ApiProperty({ description: '城市过滤', required: false })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({ description: '排序类型: default | hot | new', required: false, default: 'default' })
    @IsString()
    @IsOptional()
    sort?: string = 'default';
}
