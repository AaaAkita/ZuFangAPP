import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { QueryCommentDto } from './dto/query-comment.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('评论模块')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: '发布新评价/避雷信息' })
    async create(@CurrentUser() user: any, @Body() dto: CreateCommentDto) {
        return this.commentService.create(Number(user.userId), dto);
    }

    @Get()
    @ApiOperation({ summary: '分页查询评论（支持按小区筛选）' })
    async findAll(@Query() query: QueryCommentDto) {
        return this.commentService.findAll(query);
    }
}
