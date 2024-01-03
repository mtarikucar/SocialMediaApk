import axios from "axios";
import cheerio from "cheerio";
import {AppModel} from "../models/index.js";
import {makeRequestWithProxy} from "../utils/helpers/proxy-helper.js";


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeDetails(url) {
    try {
        const data = await makeRequestWithProxy("https://www.apkmirror.com" + url);
        const $ = cheerio.load(data);
        const variants = [];

        $('#downloads .table-row').each((i, element) => {
            const version = $(element).find('.colorLightBlack').first().text().trim();
            const architecture = $(element).find('.table-cell').eq(1).text().trim();
            const androidVersion = $(element).find('.table-cell').eq(2).text().trim();
            const dpi = $(element).find('.table-cell').eq(3).text().trim();
            const downloadLink = $(element).find('.table-cell a.accent_color').attr('href');

            if (version && architecture && androidVersion && dpi && downloadLink) {
                variants.push({version, architecture, androidVersion, dpi, downloadLink});
            }
        });

        return variants;
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error('Detail scraping error:', error.response.status, error.response.statusText);
            await delay(1000);
            return scrapeDetails(url);
        } else {
            console.error('Detail scraping error:', error.response.status, error.response.statusText);
            return scrapeDetails(url);
        }

    }
}

async function scrapeData(url, accumulatedResults = [],pageNumber = 1) {
    try {
        const data = await makeRequestWithProxy(url);
        const $ = cheerio.load(data);
        let results = [...accumulatedResults];


        if ($ === undefined) {
            return results;
        }

        const promises = $('.appRow').map(async (i, element) => {
            const version = $(element).find('.appRowTitle').text().trim();
            const isVersionExist = results.some(appModel => appModel.version === version);

            if ((await AppModel.count()) < 11 && !isVersionExist) {
                if (version.toLowerCase().includes('instagram') && !version.toLowerCase().includes('beta') && !version.toLowerCase().includes('alpha'))
                {
                    const release_date = $(element).find('.dateyear_utc').text().trim() || "no date";
                    const link = $(element).find('.downloadLink').attr('href');
                    const variants = await scrapeDetails(link);
                    const appData = {version, release_date, variants};
                    try {
                        let appModel = new AppModel(appData);
                        appModel = await appModel.save();
                        results.push(appModel);
                        console.log(`Saved: ${version}`);
                    } catch (err) {
                        console.error('Error saving to database:', err);
                    }
                }
            }
        });

        await Promise.all(promises);

        if (await AppModel.count() < 10) {
            console.log(`Scraped page ${pageNumber} successfully, ${results.length} results so far.`);
            const nextPage = `https://www.apkmirror.com/uploads/page/${pageNumber + 1}/?appcategory=instagram-instagram`;
            return scrapeData(nextPage, results,  pageNumber + 1);
        } else {
            return results;
        }

    } catch (error) {
        if (error.response && error.response.status === 429) {
            await delay(1000);
            return scrapeData(url, accumulatedResults,  pageNumber);
        } else {
            console.error('Scraping error:', error);
            return accumulatedResults;
        }
    }
}

async function clearDatabase() {
    try {
        await AppModel.deleteMany({}); // This line will delete all records in your database
        console.log('Database cleared successfully');
    } catch (error) {
        console.error('Error clearing database:', error);
    }
}

async function startScraping() {
    await clearDatabase();
    scrapeData('https://www.apkmirror.com/uploads/?appcategory=instagram-instagram');
}


export default startScraping();
