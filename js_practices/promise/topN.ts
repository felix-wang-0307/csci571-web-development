interface PromiseConstructor {
  topN(promises: Promise<any>[], n: number): Promise<any[]>;
  delay(ms: number): Promise<void>;
}

Promise.topN = function (promises: Promise<any>[], n: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    let results: any[] = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      promise
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === n) {
            resolve(results.slice(0, n));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

Promise.delay = function (ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

const delay1 = Promise.delay(1000).then(() => 1000);
const delay2 = Promise.delay(200).then(() => 200);
const delay3 = Promise.delay(300).then(() => 300);
const delay4 = Promise.delay(4000).then(() => 4000);
const delay5 = Promise.delay(5000).then(() => 5000);

const promises = [delay1, delay2, delay3, delay4, delay5];

Promise.topN(promises, 3).then((results) => {
  console.log('Top 3 results:', results);
})

Promise.topN(promises, 5).then((results) => {
  console.log('Top 5 results:', results);
})
