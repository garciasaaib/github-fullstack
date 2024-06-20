import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: 'Get commits from a Github repository' })
  @ApiParam({
    name: 'user',
    required: true,
    description: 'The Github username',
    example: 'garciasaaib',
  })
  @ApiParam({
    name: 'repo',
    required: true,
    description: 'The Github repository name',
    example: 'github-fullstack',
  })
  @ApiResponse({
    status: 200,
    description: 'The list of commits has been successfully retrieved.',
  })
  @ApiResponse({
    status: 404,
    description: 'The specified user or repository could not be found.',
  })
  @Get(':user/:repo')
  findOne(@Param('user') user: string, @Param('repo') repo: string) {
    return this.githubService.findCommits(user, repo);
  }
}
