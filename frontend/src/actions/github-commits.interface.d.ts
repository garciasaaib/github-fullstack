export interface RepositoryCommits {
  commits: CommitElement[];
}

export interface CommitElement {
  commit:       CommitCommit;
  comments_url: string;
  html_url:     string;
  author:       Author;
  committer:    Author;
  sha:          string;
}

export interface Author {
  login:      string;
  avatar_url: string;
  html_url:   string;
}

export interface CommitCommit {
  message:       string;
  url:           string;
  comment_count: number;
  verification:  Verification;
}

export interface Verification {
  verified:  boolean;
  reason:    string;
  signature: null;
  payload:   null;
}
