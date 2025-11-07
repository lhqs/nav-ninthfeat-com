const fs = require('fs');
const path = require('path');

const websitesPath = path.join(__dirname, '../data/websites.json');
const websites = JSON.parse(fs.readFileSync(websitesPath, 'utf-8'));

const invalidUrls = [];

websites.forEach((site, index) => {
  try {
    new URL(site.url);
  } catch (error) {
    invalidUrls.push({
      index,
      title: site.title,
      url: site.url,
      tags: site.tags
    });
  }
});

if (invalidUrls.length > 0) {
  console.log(`Found ${invalidUrls.length} invalid URLs:\n`);
  invalidUrls.forEach(({ index, title, url, tags }) => {
    console.log(`[${index}] ${title}`);
    console.log(`    URL: ${url}`);
    console.log(`    Tags: ${tags}`);
    console.log('');
  });
} else {
  console.log('✅ All URLs are valid!');
}
