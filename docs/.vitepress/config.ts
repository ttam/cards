import { defineConfig } from 'vitepress';
import { readFileSync } from 'node:fs';

const packageManifest = JSON.parse(
    readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
) satisfies { version: string };

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
    <rect x="4" y="3" width="27" height="34" rx="6" fill="#201f1b" stroke="#f5f0e6" stroke-width="2"/>
    <path d="M17.5 10 25 20l-7.5 10L10 20Z" fill="#f06b58"/>
</svg>`;

export default defineConfig({
    base: process.env.DOCS_BASE ?? '/cards/',
    title: 'cards.js',
    description: 'A simple TypeScript library for building card games.',
    cleanUrls: true,
    head: [
        ['meta', { name: 'theme-color', content: '#17211a' }],
        ['link', { rel: 'icon', href: `data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}` }],
    ],
    markdown: {
        preConfig(markdown) {
            markdown.core.ruler.before('normalize', 'package-version', state => {
                state.src = state.src.replaceAll('{{PACKAGE_VERSION}}', packageManifest.version);
            });

            markdown.core.ruler.before('normalize', 'source', state => {
                state.src = state.src.replace(
                    /<RunUiExample([^>]*)>([\s\S]*?)<\/RunUiExample>/g,
                    (match, attributes: string, source: string) => {
                        return `<RunUiExample source="${encodeURIComponent(source)}"></RunUiExample>`;
                    }
                );
            });
        },
    },
    themeConfig: {
        logo: {
            light: '/logo-light.svg',
            dark: '/logo-dark.svg',
            alt: 'cards.js',
        },
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'API', link: '/api/' },
            { text: 'UI', link: '/ui/' },
            { text: 'Examples', link: '/examples/' },
        ],
        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Getting started', link: '/guide/getting-started' },
                    { text: 'Installation', link: '/guide/installation' },
                ],
            },
            {
                text: 'API reference',
                items: [
                    { text: 'Overview', link: '/api/' },
                    { text: 'Card', link: '/api/card' },
                    { text: 'Pile', link: '/api/pile' },
                    { text: 'Hand', link: '/api/hand' },
                    { text: 'Deck', link: '/api/deck' },
                    { text: 'Ranks and suits', link: '/api/ranks-and-suits' },
                    {
                        text: 'Evaluators',
                        items: [
                            { text: 'Blackjack', link: '/api/blackjack-hand-evaluator' },
                            { text: 'Poker', link: '/api/poker-hand-evaluator' },
                        ],
                    },
                ],
            },
            {
                text: 'UI elements',
                items: [
                    { text: 'Overview', link: '/ui/' },
                    { text: 'Card', link: '/ui/card' },
                    { text: 'Hand', link: '/ui/hand' },
                    { text: 'Pile', link: '/ui/pile' },
                    { text: 'Theming', link: '/ui/theming' },
                ],
            },
            {
                text: 'Examples',
                items: [
                    { text: 'Overview', link: '/examples/' },
                    { text: 'Blackjack', link: '/examples/blackjack' },
                    { text: 'Texas Hold \'em', link: '/examples/texas-hold-em' },
                ],
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ttam/cards' },
        ],
        search: { provider: 'local' },
        footer: {
            message: `Copyright © ${new Date().getFullYear()} <a href="https://mattbannon.com/">Matt Bannon</a>.`,
            copyright: 'Released under the GNU GPLv3 or later.',
        },
        editLink: {
            pattern: 'https://github.com/ttam/cards/edit/main/docs/:path',
            text: 'Edit this page on GitHub',
        },
    },
});
