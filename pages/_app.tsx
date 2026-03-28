import { appWithTranslation } from 'next-i18next';
import './globals.css';
import Head from 'next/head';
import { useEffect } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { useRepurposedStore, LOCAL_STORAGE_KEY_LIKED, LOCAL_STORAGE_KEY_DISLIKED } from '@/lib/store';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const RepurposedMarketplace = ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY_LIKED)) {
      useRepurposedStore.setState(() => ({
        liked: new Set(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_LIKED)!) as number[])
      }));
    }
    if (localStorage.getItem(LOCAL_STORAGE_KEY_DISLIKED)) {
      useRepurposedStore.setState(() => ({
        disliked: new Set(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_DISLIKED)!) as number[])
      }));
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <Component {...pageProps} />
    </ConvexProvider>
  );
};

export default appWithTranslation(RepurposedMarketplace);
