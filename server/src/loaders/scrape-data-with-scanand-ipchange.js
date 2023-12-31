import axios from "axios";
import cheerio from "cheerio";
import {AppModel} from "../models/index.js";


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeDetails(url) {
    try {
        const {data} = await axios.get("https://www.apkmirror.com" + url, {
            headers: { 'User-Agent': 'Your Custom User Agent' }
        });
        const $ = cheerio.load(data);
        const variants = [];

        $('#downloads .table-row').each((i, element) => {
            const version = $(element).find('a.accent_color').first().text().trim();
            const architecture = $(element).find('.table-cell').eq(1).text().trim();
            const androidVersion = $(element).find('.table-cell').eq(2).text().trim();
            const dpi = $(element).find('.table-cell').eq(3).text().trim();
            const downloadLink = $(element).find('.table-cell a.accent_color').attr('href');

            variants.push({version, architecture, androidVersion, dpi, downloadLink});
        });

        return variants;
    } catch (error) {
        console.error('Detail scraping error:', error.response.status, error.response.statusText);
        if (error.response && error.response.status === 429) {
            await delay(1000); // Wait longer if Too Many Requests error is received
            return scrapeDetails(url); // Retry the request
        } else {
            console.error('Detail scraping error:', error.response.status, error.response.statusText);
            return [];
        }
        return [];
    }
}

async function scrapeData(url, accumulatedResults = [], pageNumber = 1) {
    await delay(500);

    try {
        const {data} = await axios.get(url, {
            headers: {'User-Agent': 'Your Custom User Agent'}
        });
        const $ = cheerio.load(data);
        const results = [...accumulatedResults];

        if ($ === undefined) {
            return results;
        }

        const promises = $('.appRow').map(async (i, element) => {
            const title = $(element).find('.appRowTitle').text().trim();
            const link = $(element).find('.downloadLink').attr('href');
            const date = $(element).find('.dateyear_utc').text().trim();

            if (title.toLowerCase().includes('instagram') && !title.toLowerCase().includes('beta') && !title.toLowerCase().includes('alpha')) {
                const variants = await scrapeDetails(link);
                const appData = {title, link, date, variants};

                try {
                    let appModel = new AppModel(appData);
                    appModel = await appModel.save();
                    results.push(appModel); // Push the saved document to the results array
                    console.log(`Saved: ${title}`);
                } catch (err) {
                    console.error('Error saving to database:', err);
                }
            }
        });

        await Promise.all(promises);

        if (results.length < 10) {
            console.log(`Scraped page ${pageNumber} successfully, ${results.length} results so far.`)
            const nextPage = `https://www.apkmirror.com/uploads/page/${pageNumber + 1}/?appcategory=instagram-instagram`;
            return scrapeData(nextPage, results, pageNumber + 1);
        } else {
            return results;
        }

    } catch (error) {
        if (error.response && error.response.status === 429) {
            await delay(1000);
            return scrapeData(url, accumulatedResults, pageNumber);
        } else {
            console.error('Scraping error:', error);
            return accumulatedResults;
        }
        return accumulatedResults;
    }
}

/*
export default scrapeData('https://www.apkmirror.com/uploads/?appcategory=instagram-instagram').then(data => {
    /!*console.log(data);*!/
});
*/
