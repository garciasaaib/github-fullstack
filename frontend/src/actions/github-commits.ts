'use server'

import { API_URL } from "@/utils/constants"
import { RepositoryCommits } from "./github-commits.interface"

export const getGithubCommits = async (owner: string, repo: string): Promise<RepositoryCommits> => {
  const baseUrl = `${API_URL}github/${owner}/${repo}`
  const response = await fetch(baseUrl)
  return await response.json()
}