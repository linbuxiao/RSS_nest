import { RouteParams, Router } from "https://deno.land/x/oak@v9.0.1/router.ts";

export default async (router: Router<RouteParams, Record<string, any>>) => {
  router.get('/', (await import('./index.ts')).router)
}
