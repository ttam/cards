<template>
    <div class="run-ui-example">
        <div ref="preview" class="preview"><slot /></div>

        <div class="wrapper">
            <pre><code :class="{ 'dark': isDark }" v-html="highlighted"></code></pre>
            <textarea @input="updatePreview" v-model="source"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { loadPrism } from './prism';
import { useData } from 'vitepress';

const { isDark } = useData();
const props = defineProps<{ source: string }>();

const preview = ref<HTMLElement | null>(null);
const prismReady = ref(false);
const source = ref('');

let Prism: any = null;

const highlighted = computed(() => {
    return prismReady.value ? Prism.highlight(source.value, Prism.languages.markup, 'markup') : source.value;
});

const updatePreview = () => preview.value!.innerHTML = source.value;

onMounted(async () => {
    source.value = decodeURIComponent(props.source)
        .replace(/^\r?\n/, '')
        .replace(/\r?\n$/, '')

    try {
        Prism = await loadPrism();
        prismReady.value = true;
    } catch {
        // Do nothing.  We just won't have syntax highlighting.
    }

    updatePreview();
});
</script>

<style>
.run-ui-example {
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    padding: 1.25rem;

    .preview {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-block-end: 1rem;
        row-gap: 1.5rem;
    }

    .wrapper {
        background: var(--vp-code-block-bg);
        border: 1px solid var(--vp-c-divider);
        inline-size: 100%;
        position: relative;

        code, textarea {
            box-sizing: border-box;
            font-family: var(--vp-font-family-mono), monospace;
            font-size: 0.75em;
            inline-size: 100%;
            line-height: 1.6;
            margin: 0;
            overflow-wrap: anywhere;
            padding: 8px 10px;
            position: absolute;
            white-space: pre-wrap;
        }

        code {
            z-index: 1;
        }

        textarea {
            background: transparent;
            block-size: fit-content;
            border: none;
            caret-color: var(--vp-c-text-1);
            color: transparent;
            field-sizing: content;
            position: relative;
            resize: vertical;
            z-index: 2;

            &::selection {
                background: color-mix(in srgb, var(--vp-c-brand-1) 50%, transparent);
            }
        }
    }
}

code {
    .attr-name { color: #8250df; }
    .attr-value, .punctuation:not(:first-child) { color: #b35900; }
    .class-name, .tag { color: #1a7f37; }
    .comment { color: var(--vp-c-text-3); font-style: italic; }
    .punctuation { color: var(--vp-c-text-2); }

    &.dark {
        .attr-value, .punctuation:not(:first-child) { color: #e3b567; }
        .token.attr-name { color: #c9a4ff; }
        .class-name, .tag { color: #7ee787; }
    }
}
</style>
