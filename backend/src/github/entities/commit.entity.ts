export interface GithubCommitsDataResponse {
  sha: string;
  node_id: string;
  commit: Commit;
  url: string;
  html_url: string;
  comments_url: string;
  author: GithubCommitsDataResponseAuthor;
  committer: GithubCommitsDataResponseAuthor;
  parents: Parent[];
}

export interface GithubCommitsDataResponseAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export interface Commit {
  author: CommitAuthor;
  committer: CommitAuthor;
  message: string;
  tree: Tree;
  url: string;
  comment_count: number;
  verification: Verification;
}

export interface CommitAuthor {
  name: string;
  email: string;
  date: Date;
}

export interface Tree {
  sha: string;
  url: string;
}

export interface Verification {
  verified: boolean;
  reason: string;
  signature: null;
  payload: null;
}

export interface Parent {
  sha: string;
  url: string;
  html_url: string;
}

export interface GithubCommitsData {
  commit: Pick<Commit, 'message' | 'url' | 'comment_count' | 'verification'>;
  comments_url: string;
  html_url: string;
  author: Pick<
    GithubCommitsDataResponseAuthor,
    'login' | 'avatar_url' | 'html_url'
  >;
  committer: Pick<
    GithubCommitsDataResponseAuthor,
    'login' | 'avatar_url' | 'html_url'
  >;
}
