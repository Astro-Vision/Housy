import { initEdgeStore } from '@edgestore/server';
import { CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';

interface Context {
  [key: string]: any;
  userId: string;
  userRole: string;
}

function createContext({ req }: CreateContextOptions): Context {
  return {
    userId: '1',
    userRole: 'ADMIN',
  }
  
}

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
export const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket()
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;