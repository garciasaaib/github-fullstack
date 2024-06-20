import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('GITHUB_API_URL') private githubApiUrl: string,
  ) {}

  async findCommits(user: string, repo: string) {
    return `${this.githubApiUrl}repos/${user}/${repo}/commits`;
    // const data = await this.httpService.get(
    //   `https://api.github.com/repos/${user}/${repo}/commits`,
    //   );

    // return data
    // return 'hello'
  }
}
