import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [
    GithubService,
    {
      provide: 'GITHUB_API_URL',
      useValue: 'https://api.github.com/',
    },
  ],
})
export class GithubModule {}
