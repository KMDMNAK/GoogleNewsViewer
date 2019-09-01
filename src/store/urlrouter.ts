import { ActionContent ,ActionCommands } from "../action";

export const router = (action:ActionContent) => {
    switch (action.commandName) {
        case ActionCommands.searchGeo:
            return `https://news.google.com/news/rss/headlines/section/geo/${action.value}?`;
        case ActionCommands.searchQuery:
            return `https://news.google.com/rss/search?q=${action.value}&`;
        case ActionCommands.searchTopic:
            return  `https://news.google.com/news/rss/headlines/section/topic/${action.value}?`;
    }
}