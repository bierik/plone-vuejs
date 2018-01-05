import joinPath from 'path.join';
import parse from 'url-parse';

export default function createAPILink(url, { apiRoot, ploneRoot }) {
  if (url.includes(apiRoot)) {
    return url;
  }

  const parsedApiRoot = parse(apiRoot);
  return `${parsedApiRoot.origin}${joinPath(parsedApiRoot.pathname, ploneRoot, url)}`;
}

export function createLink(url, { ploneRoot }) {
  const path = parse(url).pathname.replace(ploneRoot, '');
  return `#${joinPath('/', path)}`;
}

export function createTraverserLink(item, { ploneRoot }) {
  const id = item['@id'];
  return parse(id).pathname.replace(ploneRoot, '');
}
