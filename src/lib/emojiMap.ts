export const CATEGORY_EMOJI_MAP: Record<string, string> = {
  africa: "🌍",
  "animal rights": "🐾",
  art: "🎨",
  "artificial intelligence": "🤖",
  asia: "🌏",
  australia: "🇦🇺",
  charity: "🤝",
  children: "👶",
  cities: "🏙️",
  "climate change": "🌡️",
  colonialism: "🏛️",
  "criminal justice": "⚖️",
  culture: "🎭",
  cybersecurity: "🛡️",
  democracy: "🗳️",
  development: "🚀",
  "disability rights": "♿",
  drugs: "💊",
  economics: "💰",
  "education/academia": "🎓",
  "elderly/aging": "👵",
  energy: "⚡",
  environment: "🌱",
  ethics: "🧭",
  europe: "🇪🇺",
  feminism: "♀️",
  healthcare: "🩺",
  "historical memory": "📜",
  housing: "🏠",
  "human rights": "🧑‍🤝‍🧑",
  immigration: "🛂",
  "indigenous people": "🌿",
  "international relations": "🌍",
  labor: "🧰",
  "latin america": "🌎",
  law: "⚖️",
  "lgbtq+": "🏳️‍🌈",
  media: "📺",
  medical: "🏥",
  "mental health": "🧠",
  "middle east": "🏜️",
  military: "🪖",
  "minority communities": "🤝",
  nationalism: "🇺🇳",
  philosophy: "🧠",
  police: "🚔",
  policy: "📋",
  politics: "🏛️",
  privacy: "🔒",
  "private property": "🏠",
  "refugees/asylum": "🏳️",
  religion: "⛪",
  "romance/sex": "💏",
  "romance/sexuality": "💞",
  "science/technology": "🔬",
  "social justice": "⚖️",
  "social policy": "📋",
  sports: "🏆",
  terrorism: "🚨",
  trade: "📦",
  social: "🤝",
  "science/tech": "💻",
  technology: "💻",
  science: "🔬",
  ai: "🤖",
  security: "🛡️",
  war: "⚔️",
  migration: "🚚",
  justice: "⚖️",
  crime: "🚨",
  history: "📜",
  gender: "⚧️",
  education: "🎓",
  health: "🩺",
};

export const normalizeCategory = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, " ");

export const getCategoryEmoji = (category: string) => {
  const normalized = normalizeCategory(category);
  return CATEGORY_EMOJI_MAP[normalized] ?? "📌";
};

const TOURNAMENT_EMOJI_POOL = [
  "🏆",
  "🎯",
  "🌍",
  "📚",
  "💡",
  "⚖️",
  "🔬",
  "🎭",
  "⚔️",
  "🎤",
  "🚀",
  "🏅",
  "🎓",
  "🧠",
  "💻",
  "🛡️",
  "🌱",
  "📈",
  "🎵",
  "🏛️",
];

export const getTournamentEmoji = (name: string) => {
  const source = name || "Tournament";
  let hash = 0;
  for (let i = 0; i < source.length; i++) {
    hash = (hash << 5) - hash + source.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % TOURNAMENT_EMOJI_POOL.length;
  return TOURNAMENT_EMOJI_POOL[index];
};

export const renderCategoryWithEmoji = (category: string) =>
  `${getCategoryEmoji(category)} ${category}`;

export const renderTournamentWithEmoji = (name: string) =>
  `${getTournamentEmoji(name)} ${name}`;
