'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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

const Generate = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');
  const [vibe, setVibe] = useState('Professional');
  const [generatedBios, setGeneratedBios] = useState<String>('');

  console.log('Streamed response: ', generatedBios);

  const prompt =
    vibe === 'Funny'
      ? `Generate 2 funny twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure there is a joke in there and it's a little ridiculous. Make sure each generated bio is at max 20 words and base it on this context: ${bio}${
          bio.slice(-1) === '.' ? '' : '.'
        }`
      : `Generate 2 ${vibe} twitter bios with no hashtags and clearly labeled "1." and "2.". Make sure each generated bio is at least 14 words and at max 20 words and base them on this context: ${bio}${
          bio.slice(-1) === '.' ? '' : '.'
        }`;

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
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2">
      <Head>
        <title>Twitter Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <div className="sticky top-0 z-1 w-full">
          <h1 className="sm:text-6xl text-4xl  font-bold text-black dark:text-white ">
            Share your stories to Lens.
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mt-4">
            Make one yourself or let us generate a story for you with GPT3!
          </p>
          <div className="mt-4">
            <Toolbar.Root
              className="flex p-[10px] w-full min-w-max rounded-md bg-white dark:bg-[#111] border border-black"
              aria-label="Formatting options"
            >
              <Toolbar.ToggleGroup
                type="multiple"
                aria-label="Text formatting"
                className="space-x-1"
              >
                <Toolbar.ToggleItem
                  className="flex-shrink-0 flex-grow-0 basis-auto text-black dark:text-white h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white dark:bg-[#333] ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                  value="bold"
                  aria-label="Bold"
                >
                  <FontBoldIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                  className="flex-shrink-0 flex-grow-0 basis-auto text-black dark:text-white h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white dark:bg-[#333] ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                  value="italic"
                  aria-label="Italic"
                >
                  <FontItalicIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                  className="flex-shrink-0 flex-grow-0 basis-auto text-black dark:text-white h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white dark:bg-[#333] ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                  value="strikethrough"
                  aria-label="Strike through"
                >
                  <StrikethroughIcon />
                </Toolbar.ToggleItem>
              </Toolbar.ToggleGroup>
              <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />
              <Toolbar.ToggleGroup
                type="single"
                defaultValue="center"
                aria-label="Text alignment"
                className="space-x-1"
              >
                <Toolbar.ToggleItem
                  className="flex-shrink-0 flex-grow-0 basis-auto text-black dark:text-white h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white dark:bg-[#333] ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                  value="left"
                  aria-label="Left aligned"
                >
                  <TextAlignLeftIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                  className="flex-shrink-0 flex-grow-0 basis-auto text-black dark:text-white h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white dark:bg-[#333] ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                  value="center"
                  aria-label="Center aligned"
                >
                  <TextAlignCenterIcon />
                </Toolbar.ToggleItem>
                <Toolbar.ToggleItem
                  className="flex-shrink-0 flex-grow-0 basis-auto text-black dark:text-white h-[25px] px-[5px] rounded inline-flex text-[13px] leading-none items-center justify-center bg-white dark:bg-[#333] ml-0.5 outline-none hover:bg-violet3 hover:text-violet11 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7 first:ml-0 data-[state=on]:bg-violet5 data-[state=on]:text-violet11"
                  value="right"
                  aria-label="Right aligned"
                >
                  <TextAlignRightIcon />
                </Toolbar.ToggleItem>
              </Toolbar.ToggleGroup>
              <Toolbar.Separator className="w-[1px] bg-mauve6 mx-[10px]" />

              <Toolbar.Button
                className="px-[10px] text-white bg-violet9 flex-shrink-0 flex-grow-0 basis-auto h-[25px] rounded inline-flex text-[13px] leading-none items-center justify-center outline-none hover:bg-violet10 focus:relative focus:shadow-[0_0_0_2px] focus:shadow-violet7"
                style={{ marginLeft: 'auto' }}
              >
                Share
              </Toolbar.Button>
            </Toolbar.Root>
          </div>
        </div>

        <div className="max-w-2xl w-full mt-4">
          <h1 className=" font-medium text-2xl mt-12">Your Playground</h1>
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-xl">
              What would you like to generate?
            </p>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="two sentence horror story">
                  Two Sentence Horror Story{' '}
                </SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="aubergine">Aubergine</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
                <SelectItem value="carrot" disabled>
                  Carrot
                </SelectItem>
                <SelectItem value="courgette">Courgette</SelectItem>
                <SelectItem value="leek">Leek</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Meat</SelectLabel>
                <SelectItem value="beef">Beef</SelectItem>
                <SelectItem value="chicken">Chicken</SelectItem>
                <SelectItem value="lamb">Lamb</SelectItem>
                <SelectItem value="pork">Pork</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              'e.g. Senior Developer Advocate @vercel. Tweeting about web development, AI, and React / Next.js. Writing nutlope.substack.com.'
            }
          />
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium">Select your vibe.</p>
          </div>
          <div className="block">
            {/* <DropDown vibe={vibe} setVibe={(newVibe) => setVibe(newVibe)} /> */}
            <select onChange={(e) => setVibe(e.target.value)}>
              <option value="Professional">Professional</option>
              <option value="Funny">Funny</option>
            </select>
          </div>

          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
              Generate your bio &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              loading
            </button>
          )}
        </div>

        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />

        <AnimatePresence mode="wait">
          <motion.div className="space-y-10 my-10">
            {generatedBios && (
              <>
                <div>
                  <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                    Your generated bios
                  </h2>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                  {generatedBios
                    .substring(generatedBios.indexOf('1') + 3)
                    .split('2.')
                    .map((generatedBio) => {
                      return (
                        <div
                          className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                          onClick={() => {
                            navigator.clipboard.writeText(generatedBio);
                          }}
                          key={generatedBio}
                        >
                          <p>{generatedBio}</p>
                        </div>
                      );
                    })}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Generate;
