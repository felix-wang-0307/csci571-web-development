
function debounce(func: Function, delay: number) {
  let timer;
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage
(async function test() {
  const log = (message: string) => {
    console.log(message);
  }
  const debouncedLog = debounce(log, 1000);

  debouncedLog('Hello 1');
  
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello 2');
    }, 500);
  }).then((message) => {
    debouncedLog(message);
  });

  debouncedLog('Hello 3');
})();
