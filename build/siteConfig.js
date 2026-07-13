export const BLOCKABLE_SITES = {
  youtube: {
    id: "youtube",
    label: "YouTube",
    ruleId: 1,
    urlFilter: "||youtube.com",
    historyMatch: (url) => url.includes("youtube.com"),
    hostContains: "youtube.com"
  },
  youtubeShorts: {
    id: "youtubeShorts",
    label: "YouTube Shorts",
    ruleId: 2,
    urlFilter: "||youtube.com/shorts",
    historyMatch: (url) => url.includes("youtube.com/shorts/"),
    hostContains: "youtube.com"
  },
  tiktok: {
    id: "tiktok",
    label: "TikTok",
    ruleId: 3,
    urlFilter: "||tiktok.com",
    historyMatch: (url) => url.includes("tiktok.com"),
    hostContains: "tiktok.com"
  },
  instagramReels: {
    id: "instagramReels",
    label: "Instagram Reels",
    ruleId: 4,
    urlFilter: "||instagram.com/reels",
    historyMatch: (url) => url.includes("instagram.com/reels"),
    hostContains: "instagram.com"
  },
  facebook: {
    id: "facebook",
    label: "Facebook",
    ruleId: 5,
    urlFilter: "||facebook.com",
    historyMatch: (url) => url.includes("facebook.com"),
    hostContains: "facebook.com"
  },
  twitter: {
    id: "twitter",
    label: "Twitter",
    ruleId: 6,
    urlFilter: "||x.com",
    historyMatch: (url) => url.includes("twitter.com") || url.includes("x.com"),
    hostContains: "twitter.com"
  },
};