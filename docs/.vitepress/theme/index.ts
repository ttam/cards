import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import HomeHeroImage from './components/HomeHeroImage.vue';
import RunCodeExample from './tools/RunCodeExample.vue';
import RunUiExample from './tools/RunUiExample.vue';
import type { Theme } from 'vitepress';

import '../../../src/ui/cards.css';
import './custom.css';

export default {
    extends: DefaultTheme,
    Layout: () => h(DefaultTheme.Layout, null, {
        'home-hero-image': () => h(HomeHeroImage),
    }),
    enhanceApp({ app }) {
        app.component('RunCodeExample', RunCodeExample);
        app.component('RunUiExample', RunUiExample);
    },
} satisfies Theme;
