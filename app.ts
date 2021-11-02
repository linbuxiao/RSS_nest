import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";
import * as dejs from "https://deno.land/x/dejs@0.10.2/mod.ts";

const routes = JSON.parse(await Deno.readTextFile("./routes.json"));

async function parse2XML(ctx: Context<Record<string, any>>, next: () => Promise<unknown> ) {
  ctx.state.data = {}
  await next();
  const routeTtl = 0
  const keys = ['lastBuildDate', 'updated', 'ttl', 'atomlink', 'itunes_author', 'item', 'link', 'description', 'title', 'language', 'image', 'itunes_category'].reduce((prev, next) => {
    prev[next] = undefined
    return prev
  }, {} as any)
  
  const data = {
    ...keys,
    lastBuildDate: new Date().toUTCString(),
    updated: new Date().toISOString(),
    ttl: routeTtl,
    atomlink: ctx.request.url,   
    ...ctx.state.data
  }

  console.log(data);
  
  ctx.response.body = await dejs.renderFileToString(`${Deno.cwd()}\\views\\rss.ejs`, data);
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