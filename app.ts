import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import jsonfeed from "https://esm.sh/jsonfeed-to-rss"

const routes = JSON.parse(await Deno.readTextFile("./routes.json"));

async function parse2XML(ctx: Context<Record<string, any>>, next: () => Promise<unknown> ) {
  await next();
  ctx.response.body = jsonfeed(ctx.response.body);
  ctx.response.headers.set("Content-Type", "application/xml");
}

const app = new Application();

app.use(parse2XML)

const root = new Router()

const routesMap = await Promise.all(Object.entries(routes).map(async ([path, url]) => {
  return {
    prefix: path,
    module: (await import(url as string)).default
  }
}))

const allRouter = await Promise.all(routesMap.map(async ({ prefix, module }) => {
  const router = new Router({prefix})
  await module(router)
  return router
}))

allRouter.forEach(router => {
  root.use(router.routes())
  root.use(router.allowedMethods())
})

app.use(root.routes())
app.use(root.allowedMethods())
console.log(root.routes());

app.listen({ port: 8000 });