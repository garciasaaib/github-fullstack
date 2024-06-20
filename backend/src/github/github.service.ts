import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
  GithubCommitsData,
  GithubCommitsDataResponse,
} from './entities/commit.entity';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('GITHUB_API_URL') private githubApiUrl: string,
  ) {}

  public async findCommits(user: string, repo: string) {
    const endpoint = `${this.githubApiUrl}repos/${user}/${repo}/commits`;

    const response = await firstValueFrom(
      this.httpService.get<GithubCommitsDataResponse[]>(endpoint).pipe(
        catchError(() => {
          throw new NotFoundException('Repo not Found');
        }),
      ),
    );
    if (!response.data) {
      throw new NotFoundException('Repo not Found');
    }
    const finalData: GithubCommitsData[] = response.data.map((commit) => ({
      commit: {
        message: commit.commit.message,
        url: commit.commit.url,
        comment_count: commit.commit.comment_count,
        verification: commit.commit.verification,
      },
      comments_url: commit.comments_url,
      html_url: commit.html_url,
      author: {
        login: commit.author.login,
        avatar_url: commit.author.avatar_url,
        html_url: commit.author.html_url,
      },
      committer: {
        login: commit.committer.login,
        avatar_url: commit.committer.avatar_url,
        html_url: commit.committer.html_url,
      },
    }));

    return finalData;
  }
}
