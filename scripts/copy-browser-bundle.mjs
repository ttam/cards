import { copyFile, mkdir } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const publicDir = new URL('../docs/public/', import.meta.url);
const sourceAssets = new URL('../src/ui/assets/', import.meta.url);
const distAssets = new URL('assets/', dist);
const publicAssets = new URL('assets/', publicDir);

for (const file of ['cards.js', 'cards.js.map']) {
    await copyFile(new URL(file, dist), new URL(file, publicDir));
}

await Promise.all([
    copyFile(new URL('../src/ui/cards.css', import.meta.url), new URL('cards.css', dist)),
    copyFile(new URL('../src/ui/cards.css', import.meta.url), new URL('cards.css', publicDir)),
]);

await Promise.all([mkdir(distAssets, { recursive: true }), mkdir(publicAssets, { recursive: true })]);

// Every face is one cell in this CSS sprite. Browsers download it once, then
// cards select cells with background-position.
await Promise.all([
    copyFile(new URL('deck.svg', sourceAssets), new URL('deck.svg', distAssets)),
    copyFile(new URL('deck.svg', sourceAssets), new URL('deck.svg', publicAssets)),
]);
