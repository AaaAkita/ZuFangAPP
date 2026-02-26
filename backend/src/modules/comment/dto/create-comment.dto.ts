import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min, IsArray } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty({ description: '所属小区 ID', example: 1 })
    @Type(() => Number)
    @IsNumber()
    communityId: number;

    @ApiProperty({ description: '评价内容', example: '这房子隔音太差了！' })
    @IsString()
    content: string;

    @ApiProperty({ description: '图片链接数组', required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    images?: string[];

    @ApiProperty({ description: '视频链接数组', required: false, type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    videos?: string[];

    @ApiProperty({ description: '评分 (1-5)', example: 1 })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
}
