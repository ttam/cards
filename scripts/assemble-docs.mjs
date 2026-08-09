import { writeFile } from 'node:fs/promises';

const output = new URL('../docs/.vitepress/dist/', import.meta.url);

await writeFile(new URL('.nojekyll', output), '');
