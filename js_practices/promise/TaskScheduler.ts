class TaskScheduler {
  tasks: Promise<void>[] = [];
  allTasks: Promise<void>[] = [];

  private delay(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  next(result: any) {
    const task = this.delay(500).then(() => result);
    this.tasks.push(task);
    return this;
  }

  localNext(result: any) {
    const task = this.delay(0).then(() => result);
    this.tasks.push(task);
    return this;
  }

  syncNext(result: any) {
    const task = this.delay(500).then(() => result);
    this.allTasks.push(...this.tasks);
    this.tasks = [task];
    return this;
  }

  syncLocalNext(result: any) {
    const task = this.delay(0).then(() => result);
    this.allTasks.push(...this.tasks);
    this.tasks = [task];
    return this;
  }

  async getResult() {
    const result: any[] = [];
    for (const task of this.tasks) {
      result.push(await task);
    }
    console.log(result);
    return result;
  }

  async getAllResult() {
    const _tasks = [...this.tasks, ...this.allTasks];
    const result: any[] = [];
    for (const task of _tasks) {
      result.push(await task);
    }
    console.log(result);
    return result;
  }
}

const task = new TaskScheduler();

async function run() {
  await task.next(2).getResult(); // [2]

  await task.localNext(4).getResult(); // [2, 4]

  await task.syncNext(3).next(6).getResult(); // [3, 6]

  await task.syncLocalNext(1).next(5).getResult(); // [1, 5]

  await task.getAllResult(); // [1, 2, 3, 4, 5, 6]
}

run();