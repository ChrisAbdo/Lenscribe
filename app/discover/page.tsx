'use client';

import React from 'react';
import FeedPost from '@/components/FeedPost';
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  useExplorePublicationsQuery,
} from '@/lens/graphql/generated';

export default function Discover() {
  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: PublicationSortCriteria.Latest,
      },
    },
    {
      // Don't refetch the user comes back
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  if (error) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Iterate over the array of items inside the data field  */}
      <div>
        {data?.explorePublications.items.map((publication) => (
          <FeedPost publication={publication} key={publication.id} />
        ))}
      </div>
    </div>
  );
}
