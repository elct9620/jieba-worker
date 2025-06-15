import { describe, it, expect,beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import { Miniflare } from "miniflare";

describe('RPC Service Worker', () => {
  beforeEach(async (context) => {
    context.mf = new Miniflare({
      workers: [
        {
          name: "jieba",
          compatibilityFlags: ["rpc"],
          scriptPath: "./build/worker/shim.mjs",
          modules: true,
          modulesRules: [
            { type: "CompiledWasm", include: ["**/*.wasm"], fallthrough: true }
          ]
        },
        {
          name: "app",
          modules: true,
          compatibilityFlags: ["rpc"],
          serviceBindings: { jieba: { name: "jieba" } },
          script: `
      export default {
        async fetch(request, env, ctx) {
          return new Response(201)
        }
      }
      `
        }
      ]
    });
  });

  afterEach(async (context) => {
    await context.mf.dispose();
  });

  it('should cut into 7 tokens', async ({ mf }) => {
    const tokens = (await mf.getBindings("app")).jieba.cut("我愛自然語言處理")
    expect(tokens).toHaveLength(7)
  });

  it('should cut into string array', async ({ mf }) => {
    const tokens = (await mf.getBindings("app")).jieba.cut("我愛自然語言處理", { cutAll: false });
    expect(tokens).toEqual(['我', '愛', '自然', '語', '言', '處', '理']);
  });
});
