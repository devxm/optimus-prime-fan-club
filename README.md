# Optimus Prime Fan Club

A server-side rendered (SSR) [Next.js](https://nextjs.org/) App Router tribute
page featuring hand-drawn SVG art of Optimus Prime battling Megatron amid the
ruins of Cybertron. Built to run on the **Amplify Hosting SSR runtime**.

## What is this repo?

- Uses the `latest` version of Next.js (no `package-lock.json` on purpose to
  avoid pinning a specific version).
- The home page (`app/page.js`) is rendered on the server for every request
  (`export const dynamic = "force-dynamic"`) and shows the server render time.
- Deployed via Amplify Hosting using `amplify.yml` + `patch-next.sh`.

## Run locally

```bash
pnpm install   # or npm install
pnpm dev       # http://localhost:3000
```

## Build

```bash
pnpm run build
pnpm start
```

## Override Next.js version

To use a different version of Next.js instead of `latest`, set the environment
variable `NEXTJS_VERSION_OVERRIDE` in Amplify Hosting. `patch-next.sh` installs
the requested version during the build (see `amplify.yml`). For example,
`canary` or `14.2.3`.

## Disclaimer

A fan-made tribute. Transformers and all related characters are property of
Hasbro. Not affiliated with or endorsed by Hasbro.
