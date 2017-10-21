const apiUrl = 'http://cms.terralego.com/backend-sandbox/';
const options = { method: 'GET',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IlRlc3QgVXNlciIsInN1YiI6InRlc3R1c2VyIiwiZXhwIjoxNTA4NjIwNjMyfQ.FhyDLcHrl_ESRgB6Nw9fe5y32jMgSLO8rL8F_MKviUo',
  },
  mode: 'cors',
  cache: 'default',
};
const parseJSON = response => response.json();
const checkStatus = (response) => {
  if (!(response.status >= 200 && response.status < 300)) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
};

const getSchemaTypes = (type) => {
  const request = fetch(`${apiUrl}@types/${type}`, options);
  return request.then(checkStatus).then(parseJSON).catch(error => console.log('request schema type failed', error));
};

export default getSchemaTypes;
