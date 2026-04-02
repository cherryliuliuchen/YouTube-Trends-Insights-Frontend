import { useQuery } from '@tanstack/react-query'

import { getVideosByKeyword } from '../api/videos'
import type { VideosByKeywordParams } from '../api/types'
import { queryKeys } from './queryKeys'

export function useVideosByKeyword(params: VideosByKeywordParams) {
  return useQuery({
    queryKey: queryKeys.videos.byKeyword(params),
    queryFn: () => getVideosByKeyword(params),
  })
}

