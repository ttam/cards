<template>
    <div class="cards-hand" ref="hand">
        <div class="cards-card" data-face-down data-suit="hearts" data-rank="king"></div>
        <div class="cards-card" data-face-down data-suit="diamonds" data-rank="jack"></div>
        <div class="cards-card" data-face-down data-suit="clubs" data-rank="4"></div>
        <div class="cards-card" data-face-down data-suit="spades" data-rank="10"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const hand = ref<HTMLElement | null>(null);

onMounted(() => {
    window.setTimeout(() => {
        hand.value?.querySelectorAll('.cards-card')
            .forEach(card => card.removeAttribute('data-face-down'));
    }, 1000);
});
</script>

<style scoped>
.cards-hand {
    --cards-card-width: 160px;

    aspect-ratio: 5 / 7;
    inline-size: var(--cards-card-width);
    position: relative;

    & > .cards-card {
        animation: card 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        inset-block-start: 0;
        inset-inline-start: 50%;
        position: absolute;
        transform-origin: center 120%;
        transition: transform var(--cards-card-flip-duration) linear;

        &:nth-child(1) {
            rotate: -21deg;
            translate: -4em 1em;
        }

        &:nth-child(2) {
            rotate: -7deg;
            translate: -1.5em 0;
        }

        &:nth-child(3) {
            rotate: 7deg;
            translate: 1.5em 0;
        }

        &:nth-child(4) {
            rotate: 21deg;
            translate: 4em 1em;
        }
    }
}

@keyframes card {
    from {
        rotate: 0deg;
        translate: 0 0;
    }
}
</style>
