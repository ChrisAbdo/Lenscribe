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
import {
  Sun,
  Moon,
  Laptop,
  Search,
  Wifi,
  HomeIcon,
  User,
  Upload,
  Github,
  Twitter,
  BookOpen,
  X,
} from 'lucide-react';
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

  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [hamburgerOpen, setHamburgerOpen] = React.useState(false);

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
                    <ListItem href="/discover" title="Launch Lenscribe">
                      Upload your stories to Lens!
                    </ListItem>
                    <ListItem href="/discover" title="Read Anything">
                      The world is full of stories. Read the ones on Lens!
                    </ListItem>
                    <ListItem href="/discover" title="Discover New Creators">
                      Discover new creators and their stories! Who knows, you
                      may find your next favorite creator!
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
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="px-4 py-1">
              {/* Connect Wallet */}
              {/* if there is an address, display the address in stead of the connect wallet text */}
              {address ? (
                <span>
                  {address.substring(0, 5)}...
                  {address.substring(address.length - 4, address.length)}
                </span>
              ) : (
                <span>Connect Wallet</span>
              )}
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
            {address && !isOnWrongNetwork && <SignInButton />}

            {/* if connects to lens, show a hello message */}
          </DialogContent>
        </Dialog>

        {/* make hidden on small screen */}
        <div className="hidden md:block">
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

        <div className="block md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Lenscribe</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/">
                  <DropdownMenuItem>
                    <HomeIcon className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/discover">
                  <DropdownMenuItem>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Discover</span>
                  </DropdownMenuItem>
                </Link>
                <Link href="/generate">
                  <DropdownMenuItem>
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Generate</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Theme</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => window.open('https://www.github.com/chrisabdo')}
              >
                <Github className="mr-2 h-4 w-4" />
                <span>GitHub</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open('https://www.twitter.com/abdo_eth')}
              >
                <Twitter className="mr-2 h-4 w-4" />
                <span>Twitter</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
