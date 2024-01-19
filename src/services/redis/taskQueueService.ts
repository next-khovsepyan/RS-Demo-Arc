import { REDIS_HOST, REDIS_PORT } from "../../config";
import Bull from 'bull';

const taskQueue = new Bull('taskQueue', {
  redis: {
    host: REDIS_HOST, 
    port: REDIS_PORT
  }
});

export { taskQueue };