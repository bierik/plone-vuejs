import axios from 'axios';
import normalize from '@/traverser/normalizer';


export default function resolve(path) {
  return axios.get(normalize(path))
    .then(res => res.data);
}
