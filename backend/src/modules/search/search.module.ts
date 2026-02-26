import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [JwtModule.register({})],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule { }
