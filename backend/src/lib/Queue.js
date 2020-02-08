import Bee from 'bee-queue';

import CancellationMail from '../app/jobs/CancellationMail';
import NewDeliveryMail from '../app/jobs/NewDeliveryMail';

import redisConfig from '../config/redis';

const jobs = [CancellationMail, NewDeliveryMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  handleFailure(job, error) {
    // eslint-disable-next-line no-console
    console.log(`Queue: ${job.queue.name}\n FAILED: ${error}`);
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }
}

export default new Queue();
