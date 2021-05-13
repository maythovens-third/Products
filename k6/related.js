import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 200 },
    { duration: '1m30s', target: 100 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  const randomProductId = Math.floor(Math.random() * 1000000);
  let res = http.get(`http://localhost:3000/products/${randomProductId}/related`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}