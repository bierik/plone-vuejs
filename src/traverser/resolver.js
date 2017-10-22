import axios from 'axios';
import normalize from '@/traverser/normalizer';


export function extractView(path) {
  const matches = /\/(@[^?|/]*)/g.exec(path);
  const view = (matches && matches[1]) || '@view';
  return view.substring(1);
}

export default function resolve(path) {
  return axios.get(normalize(path))
    .then(res => ({ res: res.data, view: extractView(path) }));
}
