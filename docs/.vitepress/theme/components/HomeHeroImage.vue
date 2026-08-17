<template>
    <div class="cards-hand" data-layout="fan" ref="hand">
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
    }, 1500);
});
</script>

<style scoped>
.cards-hand {
    --cards-card-width: 160px;
    --cards-hand-fan-angle: 14deg;

    & > .cards-card {
        animation: fan-open 1.5s cubic-bezier(0.22, 1, 0.36, 1);
        transition: transform var(--cards-card-flip-duration) linear;
    }
}

@keyframes fan-open {
    from {
        rotate: 0deg;
    }
}
</style>
