import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: 'Get commits from a Github repository' })
  @Get(':user/:repo')
  findOne(@Param('user') user: string, @Param('repo') repo: string) {
    return this.githubService.findCommits(user, repo);
  }
}
