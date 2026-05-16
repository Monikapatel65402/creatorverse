// Run from creatorverse/ directory:  node seed.js
import { readFileSync } from 'fs'
import { createClient } from '@supabase/supabase-js'
import ws from 'ws'

// Parse .env
const envText = readFileSync(new URL('.env', import.meta.url), 'utf8')
const env = Object.fromEntries(
  envText.split('\n')
    .filter(line => line.includes('='))
    .map(line => {
      const i = line.indexOf('=')
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
    })
)

// Pass ws for Node 18 which lacks native WebSocket
const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY, {
  realtime: { transport: ws },
})

// All image URLs sourced from Wikimedia Commons (CC-licensed, free/public)
const creators = [
  {
    name: 'MrBeast',
    url: 'https://www.youtube.com/@MrBeast',
    description:
      'The most subscribed individual YouTuber ever. Jimmy Donaldson is famous for jaw-dropping stunts, massive cash giveaways, and incredibly high-budget challenge videos that push the limits of what YouTube can be.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/MrBeast_2023_%28cropped%29.jpg/330px-MrBeast_2023_%28cropped%29.jpg',
  },
  {
    name: 'PewDiePie',
    url: 'https://www.youtube.com/@PewDiePie',
    description:
      'Felix Kjellberg — the Swedish legend who held the #1 most-subscribed YouTube spot for years. Known for gaming commentary, meme reviews, and a uniquely chaotic sense of humour that defined an era of YouTube.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pewdiepie_head_shot.jpg/330px-Pewdiepie_head_shot.jpg',
  },
  {
    name: 'Marques Brownlee (MKBHD)',
    url: 'https://www.youtube.com/@mkbhd',
    description:
      'The gold standard of tech reviews on YouTube. Marques covers smartphones, laptops, EVs, and emerging tech with cinematic production quality and sharp, honest analysis. Widely considered the most trusted tech reviewer online.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Marques_Brownlee_cropped.jpg/330px-Marques_Brownlee_cropped.jpg',
  },
  {
    name: 'Markiplier',
    url: 'https://www.youtube.com/@markiplier',
    description:
      'Mark Fischbach is one of YouTube\'s most beloved gaming personalities, known for his dramatic horror game reactions, heartfelt charity work, and genuine connection with his massive fanbase. Also a filmmaker and podcaster.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Markiplier_in_We_Tried_Peanut_Free_Candy_from_YouTube_at_0-1-16_%28cropped%29.png/330px-Markiplier_in_We_Tried_Peanut_Free_Candy_from_YouTube_at_0-1-16_%28cropped%29.png',
  },
  {
    name: 'Ninja',
    url: 'https://www.youtube.com/@Ninja',
    description:
      'Tyler Blevins is the most-followed streamer of all time. He put gaming livestreams on the mainstream map with his insane Fortnite skills and a 2018 stream with Drake that broke records. Now a full-time content creator across all platforms.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Krystalogy%2C_Jess%2C_Ninja%2C_and_Typical_Gamer_relaxing_in_the_State_Farm_Gamerhood_%2852899874282%29_%28cropped%29_3.jpg/330px-Krystalogy%2C_Jess%2C_Ninja%2C_and_Typical_Gamer_relaxing_in_the_State_Farm_Gamerhood_%2852899874282%29_%28cropped%29_3.jpg',
  },
  {
    name: 'Emma Chamberlain',
    url: 'https://www.youtube.com/@emmachamberlain',
    description:
      'Emma redefined vlogging with her raw, unpolished style and self-deprecating humour. From a teenage YouTuber to a fashion icon and TIME magazine cover star — she also runs Chamberlain Coffee, her own beverage brand.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Emma_Chamberlain_for_Chamberlain_Coffee%2C_2020_%281%29.png/330px-Emma_Chamberlain_for_Chamberlain_Coffee%2C_2020_%281%29.png',
  },
  {
    name: 'Linus Tech Tips',
    url: 'https://www.youtube.com/@LinusTechTips',
    description:
      'Linus Sebastian built LMG into a tech media empire. Linus Tech Tips covers PC builds, hardware reviews, and wild tech experiments with addictively fast-paced editing. Also runs Floatplane, a creator-owned streaming platform.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Linus_Sebastian_at_LTX_2023_%28cropped%29.jpg/330px-Linus_Sebastian_at_LTX_2023_%28cropped%29.jpg',
  },
  {
    name: 'Valkyrae',
    url: 'https://www.youtube.com/@Valkyrae',
    description:
      'Rachel Hofstetter is one of the most-watched female streamers and co-owner of 100 Thieves. Known for variety gaming content, Among Us fame during the pandemic, and a genuine, warm personality that keeps fans coming back.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Valkyrae_in_2023_%284x5_cropped%29.png/330px-Valkyrae_in_2023_%284x5_cropped%29.png',
  },
  {
    name: 'Veritasium',
    url: 'https://www.youtube.com/@veritasium',
    description:
      'Derek Muller makes science feel like a thriller. Veritasium explores physics, engineering, and surprising truths about the world with meticulous research and beautiful visuals. One of the best science channels on the internet.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Veritasium_square_logo.png/330px-Veritasium_square_logo.png',
  },
  {
    name: 'Charli D\'Amelio',
    url: 'https://www.tiktok.com/@charlidamelio',
    description:
      'The first TikTok creator to reach 100 million followers. Charli rose to fame for her clean, effortless dance content and has since expanded into fashion, TV, and entrepreneurship, becoming one of Gen Z\'s defining influencers.',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Charli_D%27Amelio_3.jpg/330px-Charli_D%27Amelio_3.jpg',
  },
]

async function seed() {
  console.log(`Seeding ${creators.length} creators into Supabase...\n`)

  const { data, error } = await supabase.from('creators').insert(creators).select()
  if (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }

  console.log(`✓ Inserted ${data.length} creators:`)
  data.forEach(c => console.log(`  [${c.id}] ${c.name}`))
  console.log('\nDone! Open http://localhost:5173/creators to see them.')
}

seed()
