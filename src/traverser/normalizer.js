import joinPath from 'path.join';
import parse from 'url-parse';

export default function normalize(url, { apiRoot, ploneRoot }) {
  if (url.includes(apiRoot)) {
    return url;
  }

  const parsedApiRoot = parse(apiRoot);
  return `${parsedApiRoot.origin}${joinPath(parsedApiRoot.pathname, ploneRoot, url)}`;
}

export function createLink(url, { ploneRoot }) {
  const path = parse(url).pathname.replace(ploneRoot, '');
  return `/#${joinPath('/', path)}`;
}
