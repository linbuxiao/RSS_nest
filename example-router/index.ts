import { RouteParams, RouterContext } from "https://deno.land/x/oak/mod.ts";

export function router(ctx: RouterContext<RouteParams, Record<string, any>>) {
  ctx.state.data = {
   title: 'foo',
   description: 'bar',
   item: [
      {
         title: 'foo',
         link: '/foo',
         description: 'bar',
      }
   ]
  }
}