class LazyMan {
  name: string;
  tasks: Promise<any>[];
  
  constructor(name: string) {
    this.name = name;
    this.tasks = [];
    console.log(`Hi, I am ${this.name}`);
  }

  eat(food: string) {
    const task = new Promise((resolve) => {
      resolve(`${this.name} eats ${food}`);
    });
    this.tasks.push(task);
  }

  sleep(time: number) {
    const task = new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${this.name} sleeps for ${time} seconds`);
      }, time * 1000);
    });
    this.tasks.push(task);
  }

  sleepFirst(time: number) {
    const task = new Promise((resolve) => {
      setTimeout(() => {
        resolve(`${this.name} sleeps first for ${time} seconds`);
      }, time * 1000);
    });
    this.tasks.unshift(task);
  }

  async run() {
    for (const task of this.tasks) {
      const result = await task;
      console.log(result);
    }
  }
}

const tony = new LazyMan('Tony');
tony.eat('lunch');
tony.sleep(5);
tony.eat('dinner');
tony.sleepFirst(1);
tony.run();