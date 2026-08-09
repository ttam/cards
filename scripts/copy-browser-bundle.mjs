import { copyFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const publicDir = new URL('../docs/public/', import.meta.url);

for (const file of ['cards.js', 'cards.js.map']) {
    await copyFile(new URL(file, dist), new URL(file, publicDir));
}
