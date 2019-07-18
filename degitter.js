const degit = require('degit');

const repos = [
  'meteorite-map',  //removed
  'force-directed-country-map',  //removed
  'global-temperature-heatmap',  //removed
  'dungeon-crawl',  //removed
  'the-game-of-life',  //removed
  'react-recipe-rolodex',  //removed
  'camper-list',  //removed
  'markdown-preview',  //removed
  'countdown-to-summer',  //removed
  'flashcards',  //removed
  'fin-terest',  //removed
  'benimadim',  //removed
  'bookwall',  //removed
  'theshortrun',  //removed
  'rockthevote',  //removed
  'portfolio',  //removed
  'showmethemoney',  //removed
  'ilikethenightlife',  //removed
  'file-metadata-microservice',  //removed
  'image-search-abstraction-layer',  //removed
  'url-shortener-microservice',  //removed
  'request-header-parser-microserver',  //removed
  'timestamp-microserver',  //removed
  'memory',  //removed
];

repos.forEach(repo => {
  const emitter = degit(`rheajt/${repo}`, {
    force: true,
  });

  emitter.on('info', info => {
    console.log(info.message);
  });

  emitter.clone(`./projects/${repo}`).then(() => {
    console.log('done');
  });
});
