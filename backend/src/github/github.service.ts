import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class GithubService {
  constructor(
    private readonly httpService: HttpService,
    @Inject('GITHUB_API_URL') private githubApiUrl: string,
  ) {}

  public async findCommits(user: string, repo: string) {
    const endpoint = `${this.githubApiUrl}repos/${user}/${repo}/commits`;

    const response = await firstValueFrom(
      this.httpService.get(endpoint).pipe(
        catchError(() => {
          throw new NotFoundException('Repo not Found');
        }),
      ),
    );
    return response.data;
  }
}
