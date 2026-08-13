import DefaultTheme from 'vitepress/theme';
import RunExample from './tools/RunExample.vue';
import type { Theme } from 'vitepress';

import './custom.css';

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('RunExample', RunExample);
    },
} satisfies Theme;
