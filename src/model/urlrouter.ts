import { GoogleNewsCommands } from './command';

export default class UrlRouter {
    split_command: string[];
    value: string | null;
    constructor(command: GoogleNewsCommands, value: string | null = null) {
        console.log("router_input_command : " + command);
        this.split_command = command.split(".");
        this.value = value;
    }
    startRouting(): string {
        switch (this.split_command[0]) {
            case "search":
                var url = this.SearchRouting();
                url = encodeURI(this.setLanguage(url, languages.JAPANESE));
                return url;
        }
        throw new Error("in start routing error");
    }
    SearchRouting(): string {
        switch (this.split_command[1]) {
            case "topic":
                this.value = this.split_command[2];
                return this.makeTopicUrl(this.value);
            case "geo":
                if (this.value === null) {
                    throw new Error("no value input");
                }
                return this.makeGeoUrl(this.value);
            case "query":
                if (this.value === null) {
                    throw new Error("no value input");
                }
                return this.makeQueryUrl(this.value);
        }
        return "error";
    }
    makeTopicUrl(TopicWord: string): string {
        var url = `https://news.google.com/news/rss/headlines/section/topic/${TopicWord}`;
        console.log("in maketopicurl" + url);
        return url;
    }
    makeGeoUrl(GeoWord: string) {
        return `https://news.google.com/news/rss/headlines/section/geo/${GeoWord}`;
    }
    makeQueryUrl(QueryString: string) {
        return `https://news.google.com/rss/search?q=${QueryString}`;
    }
    setLanguage(url:string,language_code:languages) {
        return url + "?"+language_code;
    }
}

enum languages{
    JAPANESE = "hl=ja&gl=JP&ceid=JP:ja",
    AMERICAN_ENGLISH = "hl=en-US&gl=US&ceid=US:en",
    BRITISH_ENGLISH = "hl=en-GB&gl=GB&ceid=GB:en",
    CHINESE = "hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
    DEUTCH = "hl=de&gl=DE&ceid=DE:de",
    SPANISH = "hl=es-419&gl=US&ceid=US:es-419",
    ARABIC="hl=ar&gl=EG&ceid=EG:ar"
}