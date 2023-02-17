import {
  useAddress,
  useNetworkMismatch,
  useNetwork,
  ConnectWallet,
  ChainId,
  MediaRenderer,
} from '@thirdweb-dev/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import useLensUser from '@/lens/lib/auth/useLensUser';
import useLogin from '@/lens/lib/auth/useLogin';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress(); // Detect the connected address
  const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on the wrong network
  const [, switchNetwork] = useNetwork(); // Function to switch the network.
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

  // 1. User needs to connect their wallet
  if (!address) {
    return <ConnectWallet />;
  }

  // 2. User needs to switch network to Polygon
  if (isOnWrongNetwork) {
    return (
      <button
        className="hidden"
        onClick={() => switchNetwork?.(ChainId.Polygon)}
      >
        Switch Network
      </button>
    );
  }

  // Loading their signed in state
  if (isSignedInQuery.isLoading) {
    return <div>Loading... you might need to refresh</div>;
  }

  // If the user is not signed in, we need to request a login
  if (!isSignedInQuery.data) {
    return (
      <Button
        className="w-full dark:text-black text-white"
        variant="default"
        size="lg"
        onClick={() => requestLogin()}
      >
        Sign in with Lens 🌿
      </Button>
    );
  }

  // Loading their profile information
  if (profileQuery.isLoading) {
    return (
      <Button disabled>
        <span className="text-white dark:text-black flex">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading profile...
        </span>
      </Button>
    );
  }

  // If it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return (
      <Button
        disabled
        className="w-full dark:text-black text-white"
        variant="default"
        size="lg"
      >
        No Lens profile found.
      </Button>
    );
  }

  // If it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <Button
        variant="default"
        size="lg"
        className="flex border border-white rounded-md"
      >
        {/* <MediaRenderer
          // @ts-ignore
          src={profileQuery?.data?.defaultProfile?.picture?.original?.url || ''}
          alt={profileQuery.data.defaultProfile.name || ''}
          style={{
            width: 48,
            height: 48,
            borderRadius: '20%',
          }}
        />
        <Link
          href={`/profile/${profileQuery.data.defaultProfile.handle}`}
          className="text-xl font-bold ml-4 mt-2.5"
        >
          Welcome {profileQuery.data.defaultProfile.name}! 🎉
        </Link> */}
        <Link
          className="text-md text-white dark:text-black"
          href={`/profile/${profileQuery.data.defaultProfile.handle}`}
        >
          Welcome {profileQuery.data.defaultProfile.name} (
          {profileQuery.data.defaultProfile.handle})! 🎉
        </Link>
      </Button>
    );
  }

  return <div>Something went wrong.</div>;
}
