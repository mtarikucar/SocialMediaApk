import mongooseLoader from './mongoose.js';
import expressLoader from './express.js';
import redisLoader from './redis.js';
/*import scrapeData from './scrape-data.js';*/

export default async (app) => {
  /*await redisLoader();*/
  await mongooseLoader();
  await expressLoader(app);
  /*scrapeData();*/
}
