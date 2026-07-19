import { type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public
     */
    "/((?!api|trpc|_next|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};
