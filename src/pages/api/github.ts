import { GetGithubContributions } from '@/lib/graphql'
import type { GithubContributionData } from '@/types'
import type { APIRoute } from 'astro'
import request from 'graphql-request'

const GITHUB_URL = 'https://api.github.com/graphql'

// TODO: only receive request from same origin

export const GET: APIRoute = async () => {
  const response = await request({
    url: GITHUB_URL,
    document: GetGithubContributions,
    variables: { userName: 'jestsee' },
    requestHeaders: {
      Authorization: `Bearer ${import.meta.env.GITHUB_ACCESS_TOKEN}`
    }
  })

  const options = {
    status: 200,
    headers: {
      'Cache-Control': 's-maxage=3600',
      'Content-Type': 'application/json'
    }
  }

  const parsedResponse = (response as any).user.contributionsCollection
    .contributionCalendar

  const mappedResponse: GithubContributionData = {
    lastPushedAt: (response as any).user.repositories.nodes[0].pushedAt,
    totalContributions: parsedResponse.totalContributions,
    contributions: parsedResponse.weeks.flatMap((week: any) => {
      return week.contributionDays.map((day: any) => {
        return {
          count: day.contributionCount,
          date: day.date.replace(/-/g, '/')
        }
      })
    })
  }

  return new Response(JSON.stringify(mappedResponse), options)
}
