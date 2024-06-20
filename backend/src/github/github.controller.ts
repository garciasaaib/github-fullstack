import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('')
  getData() {
    return 'This action returns a github repo';
  }

  @Get(':user/:repo')
  findOne(@Param('user') user: string, @Param('repo') repo: string) {
    return this.githubService.findCommits(user, repo);
  }
}
