'use client';

import React from 'react';
import {
  useProfileQuery,
  usePublicationsQuery,
} from '@/lens/graphql/generated';
import { usePathname } from 'next/navigation';
import { MediaRenderer, Web3Button } from '@thirdweb-dev/react';
import FeedPost from '@/components/FeedPost';
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from '@/lens/const/contracts';
import { useFollow } from '@/lens/lib/useFollow';

type Props = {};

export default function ProfilePage({}: Props) {
  const pathName = usePathname();
  // Grab the path / [id] field from the URL
  const handle = pathName?.split('/')[2];

  const { mutateAsync: followUser } = useFollow();

  const {
    isLoading: loadingProfile,
    data: profileData,
    error: profileError,
  } = useProfileQuery(
    {
      request: {
        handle: handle,
      },
    },
    {
      enabled: !!handle,
    }
  );

  const {
    isLoading: isLoadingPublications,
    data: publicationsData,
    error: publicationsError,
  } = usePublicationsQuery(
    {
      request: {
        profileId: profileData?.profile?.id,
      },
    },
    {
      enabled: !!profileData?.profile?.id,
    }
  );

  if (publicationsError || profileError) {
    return <div>Could not find this profile.</div>;
  }

  if (loadingProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <div>
        {/* Cover Image */}
        {/* @ts-ignore */}
        {profileData?.profile?.coverPicture?.original?.url && (
          <MediaRenderer
            // @ts-ignore
            src={profileData?.profile?.coverPicture?.original?.url || ''}
            alt={
              profileData?.profile?.name || profileData?.profile?.handle || ''
            }
          />
        )}
        {/* Profile Picture */}
        {/* @ts-ignore */}
        {profileData?.profile?.picture?.original?.url && (
          <MediaRenderer
            // @ts-ignore
            src={profileData.profile.picture.original.url}
            alt={profileData.profile.name || profileData.profile.handle || ''}
          />
        )}

        {/* Profile Name */}
        <h1>{profileData?.profile?.name || 'Anon User'}</h1>
        {/* Profile Handle */}
        <p>@{profileData?.profile?.handle || 'anonuser'}</p>

        {/* Profile Description */}
        <p>{profileData?.profile?.bio}</p>

        <p>
          {profileData?.profile?.stats.totalFollowers} {' Followers'}
        </p>

        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => await followUser(profileData?.profile?.id)}
        >
          Follow User
        </Web3Button>

        <div>
          {isLoadingPublications ? (
            <div>Loading Publications...</div>
          ) : (
            // Iterate over the items in the publications array
            publicationsData?.publications.items.map((publication) => (
              <FeedPost publication={publication} key={publication.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
