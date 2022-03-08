const searchEngines = {
  g: 'https://google.com/search?q={q}',

  npm: 'https://npmjs.org/package/{q}',
  git: 'https://github.com/search?q={q}',
  github: 'https://github.com/{q}',
  mdn: 'https://developer.mozilla.org/en-US/search?q={q}',
  
  duck: 'https://duckduckgo.com/?q={q}',

  spotify: 'https://open.spotify.com/search/{q}',

  twitter: 'https://twitter.com/search?q={q}&src=typed_query',
  reddit: 'https://www.reddit.com/search/?q={q}',
  instagram: 'https://instagram.com/{q}',
  yt: 'https://www.youtube.com/results?search_query={q}&page={startPage?}&utm_source=opensearch',
  twitch: 'https://www.twitch.tv/{q}',

  amazon: 'https://www.amazon.de/s?k={q}',
  a: 'https://www.amazon.de/s?k={q}',
  az: 'https://www.amazon.de/s?k={q}',
  
  repo: 'https://repo.new',
  gist: 'https://gist.new',
  docs: 'https://docs.new',
  slides: 'https://slides.new',
  sheet: 'https://sheets.new',

  imgur: 'https://imgur.com/search?q={q}',
  maps: 'https://www.google.com/maps/search/{q}',
  gm: 'https://www.google.com/maps/search/{q}',
  googleimages: 'https://www.google.com/search?q={q}&tbm=isch',
  gi: 'https://www.google.com/search?q={q}&tbm=isch',

  namemc: 'https://de.namemc.com/search?q={q}',
  gt: 'https://translate.google.com/?sl=auto&tl=en&text={q}&op=translate',
  deepl: 'https://www.deepl.com/translator#xx/en/{q}'
};

addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});

async function handleRequest(event) {
  const { request } = event;
  const url = new URL(request.url);

  const query = url.searchParams.get('q');

  if (!query) {
    return new Response(JSON.stringify({ message: 'Invalid Search Params', status: 400 }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }

  if (query.startsWith('!')) {
    const bang = query.split(' ')[0].slice(1).toLowerCase();
    const eng = searchEngines[bang];
    
    if (eng) {
      const q = query.split(' ').slice(1).join(' ');
      const url = eng.split('{q}').join(q);

      console.log(url);

      return Response.redirect(url, 301);
    }
  }

  const eng = searchEngines.g;
  return Response.redirect(eng.split('{q}').join(query), 301);
}