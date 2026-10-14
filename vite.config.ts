import { readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';

// Ship third-party licenses with every build.
const thirdPartyNotices: Plugin = {
  name: 'third-party-notices',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'THIRD_PARTY_NOTICES.txt',
      source: readFileSync(new URL('./THIRD_PARTY_NOTICES.txt', import.meta.url), 'utf8'),
    });
  },
};

export default defineConfig({
  // GitHub Pages project subpath, while keeping local development at '/'.
  base: process.env.GITHUB_PAGES === 'true' ? '/kamikaze/' : '/',
  plugins: [thirdPartyNotices],
  server: { port: 5173, open: true },
  build: { chunkSizeWarningLimit: 1500 },
  test: { environment: 'node', include: ['tests/**/*.test.ts'] },
} as never);
