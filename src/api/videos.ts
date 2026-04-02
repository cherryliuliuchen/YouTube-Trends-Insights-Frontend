import { apiClient } from './client'
import type { VideosByKeywordParams, VideosByKeywordResponse } from './types'

export async function getVideosByKeyword(params: VideosByKeywordParams): Promise<VideosByKeywordResponse> {
  const { keyword, limit } = params
  const encodedKeyword = encodeURIComponent(keyword)

  const res = await apiClient.get<VideosByKeywordResponse>(
    `/videos/by-keyword/${encodedKeyword}`,
    {
      params: { limit },
    },
  )

  return res.data
}

