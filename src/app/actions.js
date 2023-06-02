'use server';
import * as cheerio from 'cheerio';
const cors = require('cors')({origin: true});

export async function getData() {
  const res = await fetch(`https://nitter.net/search?f=tweets&q=(%23space)&f-images=on&since=&until=&near=`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const $timelineItems = $('.timeline');
  const $array = $('.icon-container').children('.icon-retweet').parent().text().split(' ');
  const $tweet = $(`span:contains(${Math.max(...$array)})`).parentsUntil('.timeline-item');
  const $image = $tweet.find('.still-image').attr('href');
  const $user = $tweet.find('.username').first().text();
  const $link = $tweet.siblings('.tweet-link').attr('href');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  const tweetData = {
    image: `https://nitter.net${$image}`,
    tweet: `https://nitter.net${$link}`,
    user: $user
  };
  
  return tweetData;
}


