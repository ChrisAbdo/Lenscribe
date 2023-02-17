'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Head from 'next/head';
import { useState, useCallback } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from '@/lens/const/contracts';
import { useCreatePost } from '@/lens/lib/useCreatePost';

import * as Toolbar from '@radix-ui/react-toolbar';
import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
} from '@radix-ui/react-icons';
import { Textarea } from '@/components/ui/text-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [vibe, setVibe] = useState('Professional');
  const [generatedBios, setGeneratedBios] = useState<String>('');
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { mutateAsync: createPost } = useCreatePost();

  console.log('content:', {
    image,
    title,
    description,
    content,
  });

  console.log('Streamed response: ', generatedBios);

  const prompt =
    'Write me an awesome story. DO not make it too long. I want to read it in 1 minute or less.';

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios('');
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Twitter Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-white dark:bg-black pb-24 sm:pb-32">
          {/* <!-- spacer div --> */}
          <div className="h-[5rem]"></div>

          <div className="mx-auto flex max-w-5xl flex-col items-start gap-10 px-6 md:flex-row lg:px-8">
            <div className="w-full md:sticky md:top-10 md:w-[28rem]">
              <p className="mt-12 text-3xl font-bold tracking-tight sm:text-4xl">
                Write a story to post on Lens!
              </p>
              <p className="mt-6 mb-2 text-base leading-7">
                Or if you&apos;re feeling lazy, you can generate a story with
                GPT3!
              </p>

              {!loading && (
                <Button
                  onClick={(e) => generateBio(e)}
                  size="lg"
                  variant="default"
                >
                  <span className="text-white dark:text-black flex">
                    Generate with AI&nbsp;
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                      />
                    </svg>
                  </span>
                </Button>
              )}

              {loading && (
                <Button size="lg" variant="default">
                  <span className="text-white dark:text-black flex">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Writing your story...
                  </span>
                </Button>
              )}
            </div>
            <div className="mt-5 w-full min-w-0 flex-1 md:mt-0">
              <dl className="grid grid-cols-1 gap-y-10 gap-x-8 md:max-w-xl lg:max-w-none lg:gap-y-16">
                <div className="relative rounded-lg bg-gray-50 dark:bg-[#111] border dark:border-[#333] p-10">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      onChange={(e: any) => setTitle(e.target.value)}
                      type="email"
                      id="title"
                      placeholder="Story Title"
                    />
                    <p className="text-sm ">Enter your story title here.</p>
                  </div>
                </div>

                <div className="relative rounded-lg bg-gray-50 dark:bg-[#111] border dark:border-[#333] p-10">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Story</Label>
                    <Textarea
                      // @ts-ignore
                      // value={generatedBios}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your story here..."
                      className=""
                    />
                  </div>
                </div>

                <div className="relative rounded-lg bg-gray-50 dark:bg-[#111] border dark:border-[#333] p-10">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Description</Label>
                    <Textarea
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter a short description here..."
                    />
                  </div>
                </div>

                <div className="relative rounded-lg bg-gray-50 dark:bg-[#111] border dark:border-[#333] p-10">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Cover Image</Label>
                    <input
                      className="block w-full p-2 text-sm text-gray-900 border border-slate-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-[#111] dark:border-[#333] dark:placeholder-gray-400"
                      id="file_input"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files) {
                          setImage(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                </div>

                {/* <Button size="lg" variant="default" className="w-full">
                  <span className="text-white dark:text-black">
                    Upload Story to Lens 🌿
                  </span>
                </Button> */}
                <Web3Button
                  contractAddress={LENS_CONTRACT_ADDRESS}
                  contractAbi={LENS_CONTRACT_ABI}
                  action={async () => {
                    if (!image) return;

                    return await createPost({
                      image,
                      title,
                      description,
                      content,
                    });
                  }}
                >
                  Create Post
                </Web3Button>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Generate;
