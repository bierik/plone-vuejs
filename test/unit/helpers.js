import moxios from 'moxios';
import joinPath from 'path.join';


export default function stubRequest(path, response) {
  return moxios.stubRequest(`http://localhost:9000/${joinPath('plone', path)}`, {
    status: 200,
    response,
  });
}
