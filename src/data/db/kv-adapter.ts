import { remoteStore } from 'xwebdb';

export function remoteDB(token: string, endpoint: string, batchSize: number = 100) {
  return function (name: string) {
    return new Store(token, endpoint, name, batchSize);
  };
}

class Store implements remoteStore {
  token: string = '';
  endpoint: string = '';
  name: string;
  batchSize: number = 100;
  concurrencyLimit: number = 10;
  constructor(token: string, endpoint: string, name: string, batchSize: number = 100) {
    this.token = token;
    this.endpoint = endpoint;
    this.name = name;
    this.batchSize = batchSize;
  }
  async get(key: string) {
    return (await this.request('GET', [key]))[0] as Promise<string>;
  }
  async keys() {
    const res: string[] = [];
    let cursor = '';
    while (true) {
      const page = await this.request('GET', cursor ? [`cursor:${cursor}`]: undefined) ;
      res.push(...page.keys);
      if(page.complete) break;
      if(!page.cursor) break;
      cursor = page.cursor;
    }
    return res;
  }

  async getBulk(keys: string[]) {
    const batches = this.toBatches(keys);
    return (await this.runBatch(batches.map(batch => () => this.request('GET', batch)))).flat();
  }
  async clear() {
    const keys = await this.keys();
    await this.delBulk(keys);
    return true;
  }
  async del(key: string) {
    return this.request('DELETE', [key]);
  }
  async delBulk(keys: string[]) {
    const batches = this.toBatches(keys);
    return (await this.runBatch(batches.map(batch => () => this.request('DELETE', batch)))).flat();
  }

  async set(key: string, value: string) {
    return this.request('PUT', [], JSON.stringify({ [key]: value }));
  }
  async setBulk(couples: [string, string][]) {
    const batches = this.toBatches(couples);
    return (await this.runBatch(batches.map(batch => () => this.request('PUT', [], JSON.stringify(Object.fromEntries(batch)))))).flat();
  }

  toBatches<T>(array: T[]): T[][] {
    return Array.from({ length: Math.ceil(array.length / this.batchSize) }, (_, index) => array.slice(index * this.batchSize, index * this.batchSize + this.batchSize));
  }

  async runBatch(promises: (() => Promise<any>)[]) {
    const results: any = [];
    let running = 0;
    let index = 0;

    function runNextPromise(): any {
      if (index === promises.length) {
        return Promise.resolve();
      }

      const currentIndex = index;
      const promise = promises[index]();

      index++;
      running++;

      return promise.then(result => {
        results[currentIndex] = result;
        running--;
        return runNextPromise();
      });
    }

    const promisesToRun = Array.from({ length: Math.min(this.concurrencyLimit, promises.length) }, () => runNextPromise());

    await Promise.all(promisesToRun);
      const remainingResults = await Promise.all(promises.slice(promisesToRun.length).map(promise_1 => promise_1()));
      return results.concat(remainingResults);
  }

  async request(method: string, keys: string[] = [], data: string = ''): Promise<any> {
    return new Promise(resolve => {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          resolve(JSON.parse(this.responseText));
        }
      });
      xhr.open(method, keys.length ? `${this.endpoint}?${keys.join(',')}` : this.endpoint);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', this.token);
      xhr.send(data.length ? data : undefined);
    });
  }
}
