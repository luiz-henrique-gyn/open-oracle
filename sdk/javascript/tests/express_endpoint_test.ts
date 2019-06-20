import fetch from 'node-fetch';
import {endpoint} from '../src/express_endpoint';

test('integration test', async () => {
  const privateKey = '0x177ee777e72b8c042e05ef41d1db0f17f1fcb0e8150b37cfad6993e4373bdf10';
  const timestamp = +new Date(2019, 6, 20);

  async function fetchPrices(): Promise<[number, object]> {
    return [timestamp, {'eth': 260.0, 'zrx': 0.58}];
  }

  const port = 10123;
  const app = endpoint(privateKey, fetchPrices).listen(port);
  const response = await fetch(`http://localhost:${port}/prices.json`);

  expect(response.ok).toBe(true);
  expect(await response.json()).toEqual({
    message: "0x0000000000000000000000000000000000000000000000000000016c0e2e218000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000036574680000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000e18398e76019000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000037a727800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000080069f78df770a3",
    prices: {
      eth: 260,
      zrx: 0.58,
    },
    signature: "0xafb2aeb4bdf9d1fca04858d0db0f6023a94d1f6b6ce637641020044249f079002a680b038c6b0c6fe9d89bb6b7a4b1c74de9792db342d0223d6ba944f1d54361000000000000000000000000000000000000000000000000000000000000001c"
  });
});