const URL = 'https://graphql.anilist.co';

const QUERY = `
query ($page: Int, $perPage: Int, $search: String, $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { total currentPage lastPage hasNextPage }
    media(type: ANIME, search: $search, sort: $sort, status_not: NOT_YET_RELEASED) {
      id
      title { romaji english }
      coverImage { large color }
      bannerImage
      description(asHtml: false)
      averageScore
      episodes
      format
      status
      seasonYear
      genres
    }
  }
}`;

export async function fetchAnime({ page = 1, perPage = 24, search, sort = 'POPULARITY_DESC' }) {
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      query: QUERY,
      variables: { page, perPage, search: search || undefined, sort: [sort] },
    }),
  });
  if (!res.ok) throw new Error(`Ошибка API: ${res.status}`);
  const json = await res.json();
  return json.data.Page;
}

export async function fetchMany(pages = 5, perPage = 50) {
  const all = [];
  for (let p = 1; p <= pages; p++) {
    const data = await fetchAnime({ page: p, perPage });
    all.push(...data.media);
    if (!data.pageInfo.hasNextPage) break;
  }
  return all;
}