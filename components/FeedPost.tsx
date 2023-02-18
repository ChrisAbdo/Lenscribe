import { MediaRenderer } from '@thirdweb-dev/react';
import Link from 'next/link';
import React from 'react';
import { ExplorePublicationsQuery } from '@/lens/graphql/generated';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Button } from '@/components/ui/button';
import { Code2, Flag, Link2, MoreVertical } from 'lucide-react';

type Props = {
  publication: ExplorePublicationsQuery['explorePublications']['items'][0];
};

export default function FeedPost({ publication }: Props) {
  console.log(publication);

  return (
    <div className="p-4">
      <div className="border border-[#333] rounded-md px-4 py-5 sm:px-6 card3">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            {/* <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            /> */}
            {(publication.metadata.image ||
              publication.metadata.media?.length > 0) && (
              <MediaRenderer
                // @ts-ignore
                src={publication?.profile?.picture?.original?.url || ''}
                alt={publication.profile.name || publication.profile.handle}
                className="!h-10 !w-10 !rounded-md"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-md font-medium ">
              <Link href={`/profile/${publication.profile.handle}`}>
                {publication.profile.name || publication.profile.handle} | @
                {publication.profile.handle}
              </Link>
            </p>
            <p className="text-sm ">
              {/* {publication.createdAt} */}
              {/* properly format the publication.createdAt */}
              {new Date(publication.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-shrink-0 self-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Flag size={15} className="mr-2 text-red-500" />
                    <span className="text-red-500">Report</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Code2 size={15} className="mr-2" />
                    <span>Embed</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link2 size={15} className="mr-2" />
                    <span>Permalink</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <h1 className="mt-4 text-2xl font-bold">{publication.metadata.name}</h1>
        <p className="mt-4 text-sm ">{publication.metadata.description}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="mt-4">
              Read Story
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{publication.metadata.name}</AlertDialogTitle>
              <AlertDialogDescription>
                {(publication.metadata.image ||
                  publication.metadata.media?.length > 0) && (
                  <MediaRenderer
                    src={
                      publication.metadata.image ||
                      publication.metadata.media[0].original.url
                    }
                    alt={publication.metadata.name || ''}
                    // center it please
                    className="!text-center !mx-auto"
                  />
                )}
                <br />
                {publication.metadata.content}
              </AlertDialogDescription>

              <div className="flex jusify-between space-x-4 mx-auto">
                <Button variant="outline" className="mt-4">
                  Like
                </Button>
                <Button variant="outline" className="mt-4">
                  Collect
                </Button>
                <Button variant="outline" className="mt-4">
                  Mirror
                </Button>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Close</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* <p className="mt-4 text-sm ">{publication.metadata.content}</p> */}

        <div className="mt-6 space-x-4">
          <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#111] border border-gray-300 dark:border-[#333] px-2.5 py-0.5 text-sm font-medium">
            {publication.stats.totalAmountOfCollects} Collects
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#111] border border-gray-300 dark:border-[#333] px-2.5 py-0.5 text-sm font-medium ">
            {publication.stats.totalAmountOfComments} Comments
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#111] border border-gray-300 dark:border-[#333] px-2.5 py-0.5 text-sm font-medium ">
            {publication.stats.totalAmountOfMirrors} Mirrors
          </span>
        </div>
      </div>
    </div>
  );
}
