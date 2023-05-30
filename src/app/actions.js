'use server';
import * as cheerio from 'cheerio';
const cors = require('cors')({origin: true})

export async function getData() {
    const res = await fetch(`https://nitter.net/search?f=tweets&q=(%23space)&f-images=on&since=&until=&near=`);
    const html = await res.text();
    const $ = cheerio.load(html);
    const $timelineItems = $('.timeline');
    const $array = $('.icon-container').children('.icon-retweet').parent().text().split(' ');
    //const $image = $timelineItems.find('.still-image').attr('href')
    const $image = $(`span:contains(${Math.max(...$array)})`).parentsUntil('.timeline-item').find('.still-image').attr('href');

    console.log($image)
    if (!res.ok) {
	throw new Error('Failed to fetch data');
    }

    return `https://nitter.net${$image}`;

}

