'use client';

import React from 'react';
import Link from 'next/link';
import {
  useNetworkMismatch,
  useAddress,
  ConnectWallet,
  useNetwork,
  ChainId,
} from '@thirdweb-dev/react';
import useLensUser from '@/lens/lib/auth/useLensUser';
import useLogin from '@/lens/lib/auth/useLogin';

import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/utils/utils';
import { Sun, Moon, Laptop, Search, Wifi } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SignInButton from './SignInButton';

type Props = {};

export default function Navbar({}: Props) {
  const { theme, setTheme } = useTheme();
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  // lens user queries and mutations
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

  // dark theme mounted state
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <header className="flex justify-between items-center p-4 w-full border-b border-black sticky top-0 z-50 bg-white dark:bg-black">
      <Link href="/" className="flex space-x-3">
        <h1 className="text-2xl font-bold ml-2 tracking-tight">Lenscribe</h1>
      </Link>

      {/* <NavigationMenu>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-white/90">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenu> */}
      <nav aria-label="Site Nav" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Discover</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-500 to-red-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <h1 className="text-2xl font-bold text-white animate-bounce">
                            🔥🔥🔥🔥
                          </h1>
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Etherwav Radio
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            The community driven and rewarding radio on Polygon
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/radio" title="Launch Etherwav">
                      Tune in to Etherwav to vibe to the best music on Polygon
                    </ListItem>
                    <ListItem href="/radio" title="Give Heat🔥">
                      Give heat to your favorite tracks and push them to the top
                      of the queue
                    </ListItem>
                    <ListItem href="/radio" title="Podcast and Live Streaming">
                      Podcasts available to upload and listen. Live Streaming
                      coming soon!
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/generate">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Generate
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/profile">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenu>
          </li>

          <li>
            <Button variant="subtle" size="sm" className="px-4">
              <Search className="mr-2 h-4 w-4" />
              Search | Ctrl K
            </Button>
          </li>
        </ul>
      </nav>
      <div className="flex space-x-4">
        {/* <Button variant="outline" size="sm" className="px-4 py-1">
          Connect Wallet
        </Button> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="px-4 py-1">
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Connect your wallet to Polygon Mainnet!</DialogTitle>
              <DialogDescription>
                Please connect your wallet to Polygon Mainnet. Once connected,
                you will be prompted to sign in to your Lens account.
              </DialogDescription>
            </DialogHeader>
            {/* some content goes here */}
            <ConnectWallet className="!bg-transparent !text-blue-500" />

            {isOnWrongNetwork && (
              <Button
                onClick={() => switchNetwork?.(ChainId.Polygon)}
                variant="destructive"
                size="lg"
                className="px-4 py-1"
              >
                <Wifi size={15} />
                Wrong Network. Switch to Polygon Mainnet
              </Button>
            )}

            {/* if there is an address and NOT on wrong network */}
            {address && !isOnWrongNetwork && (
              // <Button
              //   onClick={() => requestLogin()}
              //   variant="default"
              //   size="lg"
              //   className="px-4 py-1"
              // >
              //   <span className="text-white dark:text-black">
              //     Sign In With Lens 🌿
              //   </span>
              // </Button>
              <SignInButton />
            )}

            {/* if connects to lens, show a hello message */}
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="">
              <Sun size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 mr-4">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                <span className="text-black dark:text-white">Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                <span className="text-black dark:text-white">Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Laptop className="mr-2 h-4 w-4" />
                <span className="text-black dark:text-white">System</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-[#333] dark:focus:bg-[#333]/80',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-sm leading-snug text-slate-500 line-clamp-2 dark:text-slate-400">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
