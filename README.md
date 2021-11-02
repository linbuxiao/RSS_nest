## RSS_nest
The project was inspired by `RSSHub`.

### The cause

`RSSHub` is an excellent open source project that successfully aggregates many sites and generates RSS. it also has the support of many developers.

But at the same time it has some problems:

1. Routing mode. The `PR` of `RSSHub` is huge, which is definitely beyond imagination. Dealing with these `PR`s is a tough task, and there are already `200` pending `PR` in existence. Each `PR` basically symbolizes the addition of a new routing. Users are anxiously waiting, but the open source project has decided that the `merge` progress will not be too fast, after all, the developers are supporting with love.
2. Commonjs. `RSSHub` is an excellent project that uses many of the same excellent dependencies, but for example `got`, the latest version is already `pure esm`. `Commonjs` is hindering the development of the project, and as far as I know migration is already in its development plan, while I contribute my `PR`, which makes me realize more deeply that migration is huge and difficult.
3. Maintenance difficulties. In fact, this is also caused by the routing pattern. Concentrate on a project where you need a `PR` for each individual route you make a change to. This likewise affects maintenance.

We need a solution. I tried to give [`PR`](https://github.com/DIYgod/RSSHub/pull/8337) to help with the `ESM` migration, but progress was difficult and there was little prospect.

### The solutions
 
Discussing the new routing specification with @aidistan on the RSSHub discussion forum, he had this to say:

1. The `core` and `router` parts are truly split in meaning.
2. Change the `router` hierarchy to a personal maintenance and official maintenance section.
3. Use URLs to link to third-party routes.

I agree with all these points, so I choose `Deno` as the program:

1. Built-in `URL import` solution.
2. TS Support.
3. Pure ESM support.

### How it Works

The `core` part is only responsible for collecting routes and rendering them. Routes are recorded via `routes.json`. The key-value pairs are stored in `routes.json`: the keys are the route prefixes and the values are the routing module addresses.

This way we decouple the routing. Officially, only part of the routes are maintained, the rest need to be added after `fork`. The routing address can be any URL, just expose a `router.ts`, an example of which is given in the project.

However, this program is still incomplete, so if you have something to say about the above, please find me directly at `issues`. Thank you.


