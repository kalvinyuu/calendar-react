'use server';
import * as cheerio from 'cheerio';
const cors = require('cors')({origin: true})

export async function getData() {
  const res = await fetch(`https://nitter.net/search?f=tweets&q=(%23space)&f-images=on&since=&until=&near=`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const $timelineItems = $('.icon-container').children('.icon-retweet').parent().text();


  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return $timelineItems;
}

 
