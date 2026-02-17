# Axios Cheatsheet

## Installation

```bash
npm install axios
# or
yarn add axios
```

## Import

```js
import axios from 'axios';
// or
const axios = require('axios');
```

---

## GET Request

```js
// Simple
const res = await axios.get('/users');

// With query params
const res = await axios.get('/users', {
  params: { page: 1, limit: 10 }
});
```

## POST Request

```js
const res = await axios.post('/users', {
  name: 'John',
  email: 'john@example.com'
});
```

## PUT / PATCH Request

```js
// Full update
await axios.put('/users/1', { name: 'John', email: 'john@example.com' });

// Partial update
await axios.patch('/users/1', { name: 'Jane' });
```

## DELETE Request

```js
await axios.delete('/users/1');

// With request body
await axios.delete('/users/1', { data: { reason: 'inactive' } });
```

---

## Generic Request Config

```js
const res = await axios({
  method: 'post',
  url: '/users',
  data: { name: 'John' },
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  params: { admin: true }
});
```

---

## Creating an Instance

```js
const api = axios.create({
  baseURL: 'https://api.example.com/v1',
  timeout: 10000,
  headers: { 'Authorization': 'Bearer TOKEN' }
});

// Use the instance
const res = await api.get('/users');
```

---

## Headers

```js
// Per request
await axios.get('/users', {
  headers: {
    'Authorization': 'Bearer token123',
    'X-Custom-Header': 'value'
  }
});

// Global default
axios.defaults.headers.common['Authorization'] = 'Bearer token123';
```

---

## Interceptors

### Request Interceptor

```js
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);
```

### Response Interceptor

```js
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);
```

### Remove Interceptor

```js
const id = axios.interceptors.request.use(/* ... */);
axios.interceptors.request.eject(id);
```

---

## Error Handling

```js
try {
  const res = await axios.get('/users');
} catch (error) {
  if (error.response) {
    // Server responded with non-2xx status
    console.log(error.response.status);    // 404, 500, etc.
    console.log(error.response.data);
    console.log(error.response.headers);
  } else if (error.request) {
    // No response received
    console.log(error.request);
  } else {
    // Request setup error
    console.log(error.message);
  }
}
```

---

## Concurrent Requests

```js
const [users, posts] = await Promise.all([
  axios.get('/users'),
  axios.get('/posts')
]);

// or with axios.all (deprecated but still works)
const [users, posts] = await axios.all([
  axios.get('/users'),
  axios.get('/posts')
]);
```

---

## Cancel Requests

### Using AbortController (recommended)

```js
const controller = new AbortController();

axios.get('/users', {
  signal: controller.signal
}).catch((err) => {
  if (axios.isCancel(err)) console.log('Request cancelled');
});

// Cancel the request
controller.abort();
```

### Using CancelToken (deprecated)

```js
const source = axios.CancelToken.source();

axios.get('/users', { cancelToken: source.token });

source.cancel('Request cancelled by user');
```

---

## File Upload

```js
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('name', 'avatar');

await axios.post('/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
  onUploadProgress: (e) => {
    const percent = Math.round((e.loaded * 100) / e.total);
    console.log(`${percent}%`);
  }
});
```

---

## File Download

```js
const res = await axios.get('/files/report.pdf', {
  responseType: 'blob' // or 'arraybuffer'
});

// Browser download
const url = URL.createObjectURL(res.data);
const a = document.createElement('a');
a.href = url;
a.download = 'report.pdf';
a.click();
```

---

## Timeout & Retry

```js
// Timeout
await axios.get('/slow-endpoint', { timeout: 5000 }); // 5s

// Simple retry with axios-retry
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => error.response?.status >= 500
});
```

---

## Response Schema

```js
const res = await axios.get('/users');

res.data;    // response body
res.status;  // 200
res.statusText; // 'OK'
res.headers; // response headers
res.config;  // request config
res.request; // XMLHttpRequest / http.ClientRequest
```

---

## Request Config (Common Options)

| Option           | Type     | Description                        |
| ---------------- | -------- | ---------------------------------- |
| `url`            | string   | Request URL                        |
| `method`         | string   | HTTP method (get, post, put, etc.) |
| `baseURL`        | string   | Prepended to `url`                 |
| `headers`        | object   | Custom headers                     |
| `params`         | object   | URL query parameters               |
| `data`           | any      | Request body                       |
| `timeout`        | number   | Timeout in ms (0 = no timeout)     |
| `responseType`   | string   | json, blob, text, arraybuffer, etc.|
| `withCredentials`| boolean  | Send cookies cross-origin          |
| `auth`           | object   | `{ username, password }` for Basic |
| `signal`         | AbortSignal | For cancellation                |
| `validateStatus` | function | Define which status codes resolve  |

---

## TypeScript

```ts
import axios, { AxiosResponse } from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const res: AxiosResponse<User[]> = await axios.get<User[]>('/users');
const users: User[] = res.data;

// With instance
const api = axios.create({ baseURL: '/api' });
const user = await api.get<User>('/users/1').then(r => r.data);
```
