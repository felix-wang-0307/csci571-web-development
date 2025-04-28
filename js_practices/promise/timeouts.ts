type ICache = {
  value: number;
  resolve: () => void;
  reject: () => void;
  expired: boolean;
}

class TimeLimitedCache {
  map: Map<number, ICache>;

  constructor() {
      this.map = new Map();
  }
  
  set(key: number, value: number, duration: number): boolean {
      const cache = this.map.get(key);
      let newCache: ICache = {
        value, 
        resolve: () => {},
        reject: () => {},
        expired: false
      }
      new Promise<void>((resolve, reject) => {
        newCache.resolve = resolve;
        newCache.reject = reject;
      }).then(() => {
        this.map.delete(key);
        newCache.expired = true;
      }).catch(() => {});
      
      if (cache && !cache.expired) {
        cache.reject(); // reject the previous promise
        this.map.set(key, newCache);
        setTimeout(() => {
          if (!newCache.expired) {
            newCache.resolve();
          }
        }, duration);
        return true;
      } else {
        this.map.set(key, newCache);
        setTimeout(() => {
          if (!newCache.expired) {
            newCache.resolve();
          }
        }, duration);
        return false;
      }
  }
  
  get(key: number): number {
    const cache = this.map.get(key);
    if (cache && !cache.expired) {
      return cache.value;
    }
    return -1;
  }
  
  count(): number {
    for (const [key, cache] of this.map.entries()) {
      if (cache.expired) {
        this.map.delete(key);
      }
    }
    return this.map.size;
  }
}

/**
* const timeLimitedCache = new TimeLimitedCache()
* timeLimitedCache.set(1, 42, 1000); // false
* timeLimitedCache.get(1) // 42
* timeLimitedCache.count() // 1
*/