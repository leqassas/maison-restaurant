// Image metadata imports with Vite Imagetools
// Generating both a fallback src (1200px) and a full srcset
import amuseMeta from '../assets/images/Amuse-bouche.png?w=400;800;1200&format=webp&as=metadata';
import langoustineMeta from '../assets/images/langoustine.png?w=400;800;1200&format=webp&as=metadata';
import turbotMeta from '../assets/images/Wild-turbot.png?w=400;800;1200&format=webp&as=metadata';
import wagyuMeta from '../assets/images/a5-wagyu.png?w=400;800;1200&format=webp&as=metadata';
import duckMeta from '../assets/images/aged-duck.png?w=400;800;1200&format=webp&as=metadata';
import cheeseMeta from '../assets/images/aged-compte.png?w=400;800;1200&format=webp&as=metadata';
import souffleMeta from '../assets/images/souffle.png?w=400;800;1200&format=webp&as=metadata';

// Helper to extract data from the metadata array
const processImg = (meta) => ({
    src: meta[meta.length - 1].src, // Use the largest for WebGL/Fallback
    srcset: meta.map(m => `${m.src} ${m.width}w`).join(', ')
});

export const menuItems = [
    {
        id: 'amuse',
        name: 'Amuse Bouche',
        description: 'Seasonal prelude. Essence of spring garden.',
        price: '—',
        image: processImg(amuseMeta),
        category: 'Start'
    },
    {
        id: 'langoustine',
        name: 'Langoustine',
        description: 'Poached langoustine, caviar, white asparagus velouté.',
        price: '45',
        image: processImg(langoustineMeta),
        category: 'First Course'
    },
    {
        id: 'turbot',
        name: 'Wild Turbot',
        description: 'Braised turbot, champagne sauce, smoked leeks.',
        price: '58',
        image: processImg(turbotMeta),
        category: 'Fish'
    },
    {
        id: 'wagyu',
        name: 'A5 Wagyu',
        description: 'Kagoshima wagyu, black truffle, pomme purée.',
        price: '120',
        image: processImg(wagyuMeta),
        category: 'Meat'
    },
    {
        id: 'duck',
        name: 'Rohan Duck',
        description: 'Aged duck breast, spiced plum, salsify.',
        price: '52',
        image: processImg(duckMeta),
        category: 'Meat'
    },
    {
        id: 'cheese',
        name: 'Aged Comté',
        description: '36-month Comté, honeycomb, sourdough cracker.',
        price: '24',
        image: processImg(cheeseMeta),
        category: 'Cheese'
    },
    {
        id: 'dessert',
        name: 'Soufflé',
        description: 'Grand Marnier soufflé, vanilla bean anglaise.',
        price: '22',
        image: processImg(souffleMeta),
        category: 'Dessert'
    }
];

export const categories = {
    beginning: 'Commencement',
    sea: 'From the Sea',
    land: 'From the Land',
    ending: 'Conclusion',
};
