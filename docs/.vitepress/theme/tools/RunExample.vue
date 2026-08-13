<template>
    <section class="example">
        <button
            @click="run"
            :disabled="!ready"
            v-html="ready ? 'Run in browser' : 'Loading...'"
        />

        <pre v-if="output.length"><code v-html="output.join('\n')" /></pre>
    </section>
</template>

<script setup lang="ts">
import { blackjack, texasHoldEm } from './examples';
import { ref } from 'vue';

const props = defineProps<{ example: 'blackjack' | 'texas-hold-em' }>();

const ready = ref(true);
const output = ref<string[]>([]);

const run = () => {
    try {
        output.value = {
            'blackjack': blackjack,
            'texas-hold-em': texasHoldEm,
        }[props.example]();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        output.value = [`<span class="error">${message}</span>`];
    }
}
</script>

<style scoped>
.example {
    font-size: 0.8125rem;

    > * {
        border-radius: 0.5rem;
        color: #ffffff;
    }

    button {
        background: var(--vp-c-brand-1);
        cursor: pointer;
        font-weight: 600;
        padding: 0.5rem 1rem;


        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }

        &:hover:not(:disabled) {
            background: var(--vp-c-brand-2);
        }
    }

    pre {
        background: #0b0b0a;
        padding: 1rem;
        white-space: pre-wrap;
        word-break: break-word;

        span.error {
            color: var(--vp-c-brand-1);
        }
    }
}
</style>
