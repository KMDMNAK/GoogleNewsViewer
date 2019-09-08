import { ActionContent, ActionCommands } from "../action";
import GoogleNewsSettings from '../settings';

const Settings = new GoogleNewsSettings();

export const router = (action: ActionContent) => {
    console.log("in router" + action.value);
    let url;
    switch (action.commandName) {
        case ActionCommands.searchGeo:
            url = `https://news.google.com/news/rss/headlines/section/geo/${action.value}?`;
            break;
        case ActionCommands.searchQuery:
            url = `https://news.google.com/rss/search?q=${action.value}&`;
            break;
        case ActionCommands.searchTopic:
            url = `https://news.google.com/news/rss/headlines/section/topic/${action.value}?`;
            break;
    }
    url += languagesDict[Settings.getLanguage()] + "&";
    return url;
}

const languagesDict: { [key: string]: string } = {
    JAPANESE: "hl=ja&gl=JP&ceid=JP:ja",
    US_ENGLISH: "hl=en-US&gl=US&ceid=US:en",
    UK_ENGLISH: "hl=en-GB&gl=GB&ceid=GB:en",
    CHINESE: "hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    DEUTCH: "hl=de&gl=DE&ceid=DE:de",
    SPANISH: "hl=es-419&gl=US&ceid=US:es-419",
    ARABIC: "hl=ar&gl=EG&ceid=EG:ar"
}