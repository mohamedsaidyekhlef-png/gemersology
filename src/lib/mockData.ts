// A utility to generate realistic-looking gaming data
// In a real app, this would be replaced by API calls to Tracker.gg / Riot API / etc.

export const GAMES = {
  fortnite: { label: 'Fortnite', ranks: ['Unranked', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Champion', 'Unreal'] },
  valorant: { label: 'Valorant', ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'] },
  apex: { label: 'Apex Legends', ranks: ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'] },
  lol: { label: 'League of Legends', ranks: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'] },
  // New Games
  pubg: { label: 'PUBG: Battlegrounds', ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Master', 'Grandmaster'] },
  freefire: { label: 'Free Fire', ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Grandmaster'] },
  cod: { label: 'Call of Duty', ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Crimson', 'Iridescent', 'Top 250'] },
  pokemon: { label: 'Pokémon Unite', ranks: ['Beginner', 'Great', 'Expert', 'Veteran', 'Ultra', 'Master'] },
  rocketleague: { label: 'Rocket League', ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Champion', 'Grand Champion', 'Supersonic Legend'] },
  overwatch: { label: 'Overwatch 2', ranks: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Champion', 'Top 500'] },
  cs2: { label: 'Counter-Strike 2', ranks: ['Silver', 'Gold Nova', 'Master Guardian', 'Legendary Eagle', 'Supreme', 'Global Elite'] },
  dota2: { label: 'Dota 2', ranks: ['Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'] },
};

export interface Match {
  id: string;
  result: 'Victory' | 'Defeat' | 'Top 10' | 'Top 50' | 'Draw' | 'MVP';
  map: string;
  kills: number;
  assists: number;
  deaths: number;
  damage: number;
  score: number;
  date: string;
  agentOrHero?: string;
}

export interface PlayerStats {
  username: string;
  game: string;
  rank: string;
  rankImg?: string;
  level: number;
  matchesPlayed: number;
  winRate: number;
  kdRatio: number;
  headshotPct: number;
  hoursPlayed: number;
  recentMatches: Match[];
  chartData: { date: string; rating: number }[];
  radarData: number[]; // [Aim, GameSense, Utility, Movement, Teamwork, Consistency]
  // New Analysis Fields
  strengths: string[];
  weaknesses: string[];
  playStyle: string;
  playStyleTags: string[];
  // Deep Dive Metrics
  aimMetrics: {
    flicking: number; // 0-100
    tracking: number; // 0-100
    microAdjust: number; // 0-100
    crosshairPlacement: number; // 0-100
  };
  mapStats: { map: string; winRate: number; matches: number }[];
}

const MAPS: Record<string, string[]> = {
  fortnite: ['Pleasant Park', 'Tilted Towers', 'Retail Row', 'Salty Springs', 'Grim Gate'],
  valorant: ['Ascent', 'Bind', 'Haven', 'Split', 'Lotus', 'Sunset'],
  apex: ['Kings Canyon', 'World\'s Edge', 'Olympus', 'Storm Point'],
  lol: ['Summoner\'s Rift', 'Howling Abyss'],
  pubg: ['Erangel', 'Miramar', 'Sanhok', 'Vikendi', 'Taego', 'Deston'],
  freefire: ['Bermuda', 'Purgatory', 'Kalahari', 'Alpine', 'Nexterra'],
  cod: ['Urzikstan', 'Rebirth Island', 'Fortune\'s Keep', 'Terminal', 'Rust'],
  pokemon: ['Remoat Stadium', 'Theia Sky Ruins', 'Shivre City'],
  rocketleague: ['DFH Stadium', 'Mannfield', 'Champions Field', 'Utopia Coliseum'],
  overwatch: ['King\'s Row', 'Watchpoint: Gibraltar', 'Ilios', 'Route 66', 'Colosseo'],
  cs2: ['Mirage', 'Dust II', 'Inferno', 'Nuke', 'Overpass'],
  dota2: ['Radiant', 'Dire'],
};

const CHARACTERS: Record<string, string[]> = {
  fortnite: ['Jonesy', 'Ramirez', 'Peely', 'Midas', 'Aura'],
  valorant: ['Jett', 'Reyna', 'Omen', 'Sova', 'Sage', 'Iso', 'Clove'],
  apex: ['Wraith', 'Pathfinder', 'Gibraltar', 'Octane', 'Horizon'],
  lol: ['Ahri', 'Yasuo', 'Lee Sin', 'Thresh', 'Jinx'],
  pubg: ['Survivor', 'Ghillie Suit'],
  freefire: ['Alok', 'Kelly', 'Chrono', 'Wukong', 'Maxim', 'Skyler'],
  cod: ['Ghost', 'Price', 'Soap', 'Gaz', 'Makarov'],
  pokemon: ['Pikachu', 'Charizard', 'Lucario', 'Mewtwo', 'Greninja', 'Gengar'],
  rocketleague: ['Octane', 'Fennec', 'Dominus', 'Batmobile'],
  overwatch: ['Tracer', 'Genji', 'Mercy', 'Kiriko', 'Widowmaker', 'Reinhardt'],
  cs2: ['CT', 'T'],
  dota2: ['Pudge', 'Invoker', 'Sniper', 'Juggernaut', 'Phantom Assassin'],
};

const STRENGTHS_POOL = [
  "High Headshot %", "Clutch Factor", "Map Awareness", "Utility Usage", "First Bloods", "Team Coordination", "Eco Round Impact", "Positioning", "Objective Control", "Resource Mgmt"
];

const WEAKNESSES_POOL = [
  "Rotation Speed", "Over-Aggression", "Economy Management", "Post-Plant", "Pistol Rounds", "Trade Fragging", "Utility Waste", "Tunnel Vision"
];

const PLAYSTYLES = [
  { title: "The Entry Fragger", desc: "Highly aggressive player who seeks first contact. Creates space for the team but risks early deaths." },
  { title: "The Tactician", desc: "Calculated and patient. Relies on utility and positioning rather than raw aim to win rounds." },
  { title: "The Support Anchor", desc: "Defensive specialist. Holds sites alone and uses utility to delay pushes for team rotations." },
  { title: "The Flex", desc: "Versatile player capable of filling any role. Consistent performance across different agents and maps." },
  { title: "The Shotcaller", desc: "Natural leader who dictates the pace of the game. Prioritizes macro strategy over individual stats." }
];

// Deterministic random number generator for consistent "mock" stats based on name
const pseudoRandom = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
};

export const generatePlayerStats = (gameId: string, username: string): PlayerStats => {
  const seed = pseudoRandom(username + gameId);
  const gameKey = (GAMES[gameId as keyof typeof GAMES] ? gameId : 'fortnite') as keyof typeof GAMES;
  const gameData = GAMES[gameKey];
  
  const winRate = 40 + Math.floor(seed * 25); // 40-65%
  const kdRatio = (0.8 + seed * 4).toFixed(2); // 0.8 - 4.8
  const matchesPlayed = 100 + Math.floor(seed * 5000);
  
  // Generate Rank
  const rankIndex = Math.floor(seed * gameData.ranks.length);
  const rank = gameData.ranks[rankIndex];

  // Generate Matches
  const recentMatches: Match[] = Array.from({ length: 10 }).map((_, i) => {
    const matchSeed = pseudoRandom(username + i);
    const isWin = matchSeed > 0.5;
    
    let result: Match['result'] = isWin ? 'Victory' : 'Defeat';
    // Adjust result types for Battle Royales
    if (['fortnite', 'apex', 'pubg', 'freefire', 'cod'].includes(gameKey)) {
        if (isWin) result = 'Victory';
        else if (matchSeed > 0.2) result = 'Top 10';
        else result = 'Top 50';
    }

    // Adjust stats for non-shooter games (Rocket League, Pokemon)
    let kills = Math.floor(matchSeed * 25);
    let deaths = Math.floor(matchSeed * 15);
    let assists = Math.floor(matchSeed * 10);
    let damage = Math.floor(matchSeed * 3000);

    if (gameKey === 'rocketleague') {
        kills = Math.floor(matchSeed * 5); // Goals
        deaths = Math.floor(matchSeed * 4); // Saves (repurposed)
        assists = Math.floor(matchSeed * 3);
        damage = Math.floor(matchSeed * 800); // Score
    } else if (gameKey === 'pokemon') {
        kills = Math.floor(matchSeed * 15); // KOs
        deaths = Math.floor(matchSeed * 5); 
        damage = Math.floor(matchSeed * 50000); // Damage Dealt
    }

    return {
      id: `match-${i}`,
      result,
      map: MAPS[gameKey][Math.floor(matchSeed * MAPS[gameKey].length)],
      kills,
      deaths,
      assists,
      damage,
      score: Math.floor(matchSeed * 10000),
      date: `${Math.floor(matchSeed * 24)}h ago`,
      agentOrHero: CHARACTERS[gameKey][Math.floor(matchSeed * CHARACTERS[gameKey].length)],
    };
  });

  // Generate Chart Data (Rank Rating over time)
  const chartData = Array.from({ length: 7 }).map((_, i) => ({
    date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    rating: 1000 + Math.floor(pseudoRandom(username + 'chart' + i) * 500) + (i * 20),
  }));

  // Generate Analysis Data
  const strengthCount = 2 + Math.floor(seed * 2);
  const weaknessCount = 1 + Math.floor(seed * 2);
  
  // Shuffle and pick
  const shuffledStrengths = [...STRENGTHS_POOL].sort(() => 0.5 - pseudoRandom(username + 'str'));
  const shuffledWeaknesses = [...WEAKNESSES_POOL].sort(() => 0.5 - pseudoRandom(username + 'weak'));
  
  const playStyleIndex = Math.floor(seed * PLAYSTYLES.length);
  const playStyleData = PLAYSTYLES[playStyleIndex];

  // Generate Deep Dive Metrics
  const aimMetrics = {
    flicking: 50 + Math.floor(seed * 45),
    tracking: 40 + Math.floor(pseudoRandom(username + 'track') * 55),
    microAdjust: 45 + Math.floor(pseudoRandom(username + 'micro') * 50),
    crosshairPlacement: 30 + Math.floor(pseudoRandom(username + 'cross') * 65),
  };

  // Generate Map Stats
  const mapStats = MAPS[gameKey].slice(0, 4).map(mapName => ({
    map: mapName,
    winRate: 30 + Math.floor(pseudoRandom(username + mapName) * 60),
    matches: 10 + Math.floor(pseudoRandom(username + mapName + 'count') * 40),
  }));

  return {
    username,
    game: gameData.label,
    rank,
    level: Math.floor(seed * 500),
    matchesPlayed,
    winRate,
    kdRatio: parseFloat(kdRatio),
    headshotPct: 15 + Math.floor(seed * 30),
    hoursPlayed: Math.floor(seed * 2000),
    recentMatches,
    chartData,
    radarData: [
      60 + Math.floor(seed * 40), // Aim
      50 + Math.floor(seed * 50), // GameSense
      40 + Math.floor(seed * 60), // Utility
      70 + Math.floor(seed * 30), // Movement
      30 + Math.floor(seed * 70), // Teamwork
      50 + Math.floor(seed * 40), // Consistency
    ],
    strengths: shuffledStrengths.slice(0, strengthCount),
    weaknesses: shuffledWeaknesses.slice(0, weaknessCount),
    playStyle: playStyleData.desc,
    playStyleTags: [playStyleData.title],
    aimMetrics,
    mapStats
  };
};
