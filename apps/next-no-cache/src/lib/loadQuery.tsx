import type { QueryParams } from 'next-sanity'
import { draftMode } from 'next/headers'
import 'server-only'
import { client } from './client'
import { token } from './env'
import type { FilteredResponseQueryOptions } from '@sanity/client/stega'

const DEFAULT_PARAMS = {} as QueryParams

export async function loadQuery<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
}: {
  query: string
  params?: QueryParams
}): Promise<QueryResponse> {
  const isDraftMode = draftMode().isEnabled
  if (isDraftMode && !token) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.',
    )
  }

  const perspective = isDraftMode ? 'previewDrafts' : 'published'
  const options = {
    // Disable the Data Cache for all requests, this opts out of build time cache
    cache: 'no-store',
    filterResponse: true,
    resultSourceMap: isDraftMode ? 'withKeyArraySelector' : false,
    useCdn: !isDraftMode,
    token: isDraftMode ? token : undefined,
    perspective,
  } satisfies FilteredResponseQueryOptions
  return await client.fetch<QueryResponse>(query, params, {
    ...options,
    stega: isDraftMode,
  } as FilteredResponseQueryOptions)
}