import { defineConfig } from 'vitepress';

export default defineConfig({
    base: process.env.DOCS_BASE ?? '/cards/',
    title: 'cards.js',
    description: 'A simple TypeScript library for building card games.',
    cleanUrls: true,
    head: [
        ['meta', { name: 'theme-color', content: '#17211a' }],
    ],
    themeConfig: {
        logo: {
            light: '/logo-light.svg',
            dark: '/logo-dark.svg',
            alt: 'cards.js',
        },
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'API', link: '/api/' },
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
                ],
            },
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ttam/cards' },
        ],
        search: { provider: 'local' },
        footer: {
            copyright: `Copyright © 2026 <a href="https://mattbannon.com/">Matt Bannon</a>.`
        }
    },
});
