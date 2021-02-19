const ProductEnumOrigin = Object.freeze({
    VIETNAMESE: 'vietnamese', 
    CHINESE: 'chinese', 
    JAPANESE: 'japanese', 
    ASIAN: 'asian',          
    AMERICAN: 'american', 
    ENGLISH: 'english', 
    RUSSIAN: 'russian', 
    WESTERN: 'western', 
    OTHER: 'other',
});
const ProductEnumLanguage = Object.freeze({
    VIETNAMESE: 'vietnamese', 
    CHINESE: 'chinese', 
    JAPANESE: 'japanese',   
    ENGLISH: 'english', 
});
const ProductEnumGenre = Object.freeze({
    CRIME: "crime", 
    MYSTERY: "mystery",
    CLASSIC: "classic",
    SCIENCE: "science",
    THRILLER: "thriller",
    FICTION: "fiction",
    HISTORICAL: "historical",
    COMTEMPORARY: "contemporary",
    POETRY: "poetry",
    PLAY: "play",
    TEENAGE: "teenage",
    CHILDREN: "children",
    COMIC: "comic",
    FANTASY: "fantasy",
    HUMOROUS: "humorous",
    POLITIC: "politic",
});
const ProductEnumCurrency = Object.freeze({
    USD: "usd",
    VND: "vnd",
});

export { ProductEnumOrigin, ProductEnumGenre, ProductEnumCurrency, ProductEnumLanguage };