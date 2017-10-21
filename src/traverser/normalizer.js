import joinPath from 'path.join';
import parse from 'url-parse';


const { API_ROOT } = process.env;

export default function normalize(url) {
  if (url.includes(API_ROOT)) {
    return url;
  }
  const parsedApiRoot = parse(API_ROOT);
  return `${parsedApiRoot.origin}${joinPath(parsedApiRoot.pathname, url)}`;
}
