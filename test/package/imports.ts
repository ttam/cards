import { ranks, type Card } from '@bannon/cards';
import { Card as SubpathCard, suits } from '@bannon/cards/cards.js';

const card: Card = new SubpathCard('AS');
const rank: string = ranks[0]!.label;
const suit: string = suits[0]!.name;

void [card, rank, suit];
