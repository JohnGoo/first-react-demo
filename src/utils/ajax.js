import fetch from 'isomorphic-fetch';

function fetchJSON(url, params) {
	const data = {
	    method: 'POST',
	    'Content-Type': 'application/json',
	    body: JSON.stringify(params),
	}
	return fetch('http://localhost:1111' + url + '.json', data);
}

export const fetchJSONByPost = url => params => fetchJSON(url, params);