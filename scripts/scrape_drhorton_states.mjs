#!/usr/bin/env node
import fs from 'fs';

const BASE = 'https://www.drhorton.com';

const stateMap = {
  'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR', 'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE', 'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID', 'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS', 'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD', 'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS', 'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV', 'new-hampshire': 'NH', 'new-jersey': 'NJ', 'new-mexico': 'NM', 'new-york': 'NY', 'north-carolina': 'NC', 'north-dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK', 'oregon': 'OR', 'pennsylvania': 'PA', 'rhode-island': 'RI', 'south-carolina': 'SC', 'south-dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT', 'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west-virginia': 'WV', 'wisconsin': 'WI', 'wyoming': 'WY'
};

function uniq(arr){ return Array.from(new Set(arr)); }

async function fetchText(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return await res.text();
}

async function main(){
  console.log('Fetching homepage...');
  const homepage = await fetchText(BASE + '/');

  // find state slugs linked from the "Starting your search" area
  const slugRegex = /href=["'](?:https?:\/\/www\.drhorton\.com)?\/([a-z\-]+)["']/g;
  const slugs = [];
  let m;
  while((m = slugRegex.exec(homepage))){
    const s = m[1];
    if(stateMap[s]) slugs.push(s);
  }
  const uniqueSlugs = uniq(slugs).sort();
  console.log(`Found ${uniqueSlugs.length} states on homepage.`);

  const results = [];
  for(const slug of uniqueSlugs){
    try{
      const url = `${BASE}/${slug}`;
      console.log('Fetching', url);
      const html = await fetchText(url);

      const code = stateMap[slug] || '';

      // Extract city names from occurrences like ", {CODE}" in link text or nearby text.
      // We'll capture the word(s) immediately before the comma that precedes the state code.
      const cityRegex = new RegExp(`>([^<>]+?),\\s*${code}`, 'g');
      const cities = [];
      let mm;
      while((mm = cityRegex.exec(html))){
        const raw = mm[1].trim();
        const clean = raw.split(/\||From|\d{5}/)[0].trim();
        cities.push(clean.replace(/\s+$/,'').replace(/\s+,?\s*$/,''));
      }

      // If no cities found via state-code pattern, fall back to extracting path segments from links
      if(cities.length === 0){
        const hrefReg = new RegExp(`href=["'](?:https?:\\/\\/www\\.drhorton\\.com)?\\/${slug}\\/([^"']+)["']`,`g`);
        while((mm = hrefReg.exec(html))){
          const path = mm[1];
          const parts = path.split('/').filter(Boolean);
          // prefer the segment immediately after the region (parts[1]) if present, else use parts[0]
          const candidate = parts[1] || parts[0];
          if(candidate && /^[a-z\-]+$/.test(candidate) && candidate.length>2){
            cities.push(candidate.replace(/-/g,' ').replace(/\b\w/g,ch=>ch.toUpperCase()));
          }
        }
      }

      const cleaned = uniq(cities).map(c=> c.replace(/\s+\s/g,' ').trim()).filter(Boolean);
      results.push({ code, name: slug.replace(/-/g,' ').replace(/\b\w/g,ch=>ch.toUpperCase()), slug, cities: cleaned });
      console.log(`  -> ${cleaned.length} cities`);
      await new Promise(r=>setTimeout(r, 400));
    }catch(err){
      console.error('Error for', slug, err.message);
    }
  }

  const outPath = './src/testdata/states.json';
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log('Wrote', outPath);
}

main().catch(err=>{ console.error(err); process.exit(1); });
