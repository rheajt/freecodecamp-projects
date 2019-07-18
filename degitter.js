const degit = require('degit');

const repos = [
  'meteorite-map',
  'force-directed-country-map',
  'global-temperature-heatmap',
  'dungeon-crawl',
  'the-game-of-life',
  'react-recipe-rolodex',
  'camper-list',
  'markdown-preview',
  'countdown-to-summer',
  'flashcards',
  'fin-terest',
  'benimadim',
  'bookwall',
  'theshortrun',
  'rockthevote',
  'portfolio',
  'showmethemoney',
  'ilikethenightlife',
  'file-metadata-microservice',
  'image-search-abstraction-layer',
  'url-shortener-microservice',
  'request-header-parser-microserver',
  'timestamp-microserver',
  'memory',
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
