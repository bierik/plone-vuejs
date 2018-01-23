import { redirect } from '@/traverser/resolver';
import joinPath from 'path.join';


export default function executeHook(hook, from, to, options) {
  if (!hook) {
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    hook(
      from,
      to,
      (path) => {
        if (!path) {
          reject();
        }
        redirect(joinPath(to, path), options)
          .then(({ data }) => {
            resolve({ data, key: path });
          })
          .catch(reject);
      },
    );
  });
}
