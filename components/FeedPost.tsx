import { MediaRenderer } from '@thirdweb-dev/react';
import Link from 'next/link';
import React from 'react';
import { ExplorePublicationsQuery } from '@/lens/graphql/generated';

type Props = {
  publication: ExplorePublicationsQuery['explorePublications']['items'][0];
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  return (
    <div>
      <div>
        {/* Author Profile picture */}
        {/* <MediaRenderer
          // @ts-ignore
          src={publication?.profile?.picture?.original?.url || ''}
          alt={publication.profile.name || publication.profile.handle}
        /> */}

        {/* Author profile Name */}
        <Link href={`/profile/${publication.profile.handle}`}>
          {publication.profile.name || publication.profile.handle}
        </Link>
      </div>

      <div>
        {/* Name of the post */}
        <h3>{publication.metadata.name}</h3>

        {/* Description of the post */}
        <p>{publication.metadata.content}</p>

        {/* Image / media of the post if there is one */}
        {(publication.metadata.image ||
          publication.metadata.media?.length > 0) && (
          <MediaRenderer
            src={
              publication.metadata.image ||
              publication.metadata.media[0].original.url
            }
            alt={publication.metadata.name || ''}
          />
        )}
      </div>

      <div>
        <p>{publication.stats.totalAmountOfCollects} Collects</p>
        <p>{publication.stats.totalAmountOfComments} Comments</p>
        <p>{publication.stats.totalAmountOfMirrors} Mirrors</p>
      </div>
    </div>
  );
}
