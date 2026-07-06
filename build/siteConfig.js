export const BLOCKABLE_SITES = {
  youtubeShorts: {
    id: "youtubeShorts",
    label: "YouTube Shorts",
    ruleId: 1,
    urlFilter: "||youtube.com/shorts",
    historyMatch: (url) => url.includes("youtube.com/shorts/"),
    hostContains: "youtube.com"
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    ruleId: 2,
    urlFilter: "||tiktok.com",
    historyMatch: (url) => url.includes("tiktok.com"),
    hostContains: "tiktok.com"
  },
  instagramReels: {
    id: "instagramReels",
    label: "Instagram Reels",
    ruleId: 3,
    urlFilter: "||instagram.com/reels",
    historyMatch: (url) => url.includes("instagram.com/reels"),
    hostContains: "instagram.com"
  }
};