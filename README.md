# Jieba Worker

A Cloudflare Worker that provides Chinese text segmentation functionality using [jieba-rs](https://github.com/messense/jieba-rs).

## Features

- Fast Chinese text segmentation powered by Rust and WebAssembly
- Simple API for integrating with other Cloudflare Workers
- Can be used as a service binding in your Cloudflare Workers projects

## Deployment

### 1. Deploy to Cloudflare

First, ensure you have the [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and configured with your Cloudflare account:

```bash
# Install wrangler globally
npm install -g wrangler

# Login to your Cloudflare account
wrangler login
```

Clone this repository and deploy the worker:

```bash
git clone https://github.com/elct9620/jieba-worker.git
cd jieba-worker
pnpm install
wrangler deploy
```

After deployment, note the URL of your deployed worker. It will look something like `https://jieba-worker.<your-subdomain>.workers.dev`.

### 2. Define a Service Binding

To use this worker in another Cloudflare Worker project, add a service binding in your `wrangler.toml`:

```toml
[services]
[[services.bindings]]
name = "JIEBA"
service = "jieba-worker"
```

If you're developing locally, you can specify an environment variable for the local binding:

```toml
[env.local]
services = [
  { binding = "JIEBA", service = "jieba-worker", environment = "production" }
]
```

### 3. Call the Binding to Cut Strings

In your worker code, you can now use the service binding to segment Chinese text:

```js
export default {
  async fetch(request, env, ctx) {
    // Call the jieba-worker through the service binding
    const tokens = await env.JIEBA.cut("我愛自然語言處理");

    // Return the segmented text
    return new Response(JSON.stringify(tokens), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

The response will be a JSON array containing the segmented tokens:

```json
["我", "愛", "自然", "語", "言", "處", "理"]
```

## Development

```bash
# Install dependencies
pnpm install

# Run locally
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## License

MIT
