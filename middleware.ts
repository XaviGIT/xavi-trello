import { clerkMiddleware } from '@clerk/nextjs/server';

// TODO:
// Discover how to setup afterAuth redirects as seen in video
// https://youtu.be/pRybm9lXW2c?si=zpRIrUAOaMuueCsB&t=7065

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
