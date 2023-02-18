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
        {/* {profileData?.profile?.coverPicture?.original?.url && (
          <MediaRenderer
            // @ts-ignore
            src={profileData?.profile?.coverPicture?.original?.url || ''}
            alt={
              profileData?.profile?.name || profileData?.profile?.handle || ''
            }
            className="!w-screen h-48 object-cover"
          />
        )} */}
        {/* Profile Picture */}
        {/* @ts-ignore */}
        {/* {profileData?.profile?.picture?.original?.url && (
          <MediaRenderer
            // @ts-ignore
            src={profileData.profile.picture.original.url}
            alt={profileData.profile.name || profileData.profile.handle || ''}
          />
        )} */}

        {/* Profile Name */}
        {/* <h1>{profileData?.profile?.name || 'Anon User'}</h1> */}
        {/* Profile Handle */}
        {/* <p>@{profileData?.profile?.handle || 'anonuser'}</p> */}

        {/* Profile Description */}
        {/* <p>{profileData?.profile?.bio}</p> */}

        {/* <p>
          {profileData?.profile?.stats.totalFollowers} {' Followers'}
        </p> */}

        {/* <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => await followUser(profileData?.profile?.id)}
        >
          Follow User
        </Web3Button> */}

        <div className="p-4">
          <div className="overflow-hidden sm:rounded-lg p-6 border border-gray-300 dark:border-[#333] bg-gray-200 dark:bg-[#111] rounded-md">
            <div className="flex">
              {/* @ts-ignore */}
              {profileData?.profile?.picture?.original?.url && (
                <MediaRenderer
                  // @ts-ignore
                  src={profileData.profile.picture.original.url}
                  alt={
                    profileData.profile.name || profileData.profile.handle || ''
                  }
                  className="rounded-md !w-36 !h-36 !mb-6"
                />
              )}
              <div className="px-4 py-5 sm:px-6">
                <h3 className=" font-medium leading-6 ">
                  <h1 className="text-3xl">
                    {profileData?.profile?.name || 'Anon User'}
                  </h1>{' '}
                  <h1 className="text-lg text-[#888]">
                    @{profileData?.profile?.handle || 'anonuser'}
                  </h1>
                </h3>
                {/* <p className="mt-9 max-w-2xl text-xl ">
                  {profileData?.profile?.bio}
                </p> */}
              </div>
            </div>
            <div className="border-t border-gray-300 dark:border-[#333] px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {/* section for the bio, should not be part of those columns */}
                <div className="sm:col-span-2">
                  <dd className="mt-1 text-xl ">{profileData?.profile?.bio}</dd>
                </div>

                <div className="sm:col-span-1">
                  <dt className="text-xl font-medium ">
                    {' '}
                    {profileData?.profile?.stats.totalFollowers}
                  </dt>
                  <dd className="mt-1 text-sm ">Followers</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-xl font-medium ">
                    {profileData?.profile?.stats.totalFollowing}
                  </dt>
                  <dd className="mt-1 text-sm">Following</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

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
