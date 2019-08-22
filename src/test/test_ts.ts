function test1() {
    let array = {
        items: [
            { e1: "a", e2: "b" },
            { e1: "c", e2: "d" },
            { e1: "e", e2: "f" }
        ]
    }

    console.log(array)
    function change(array: any) {
        array.items.forEach((element: any) => {
            element.e1 = "CHANGED";
        })
        return array;
    }

    console.log(change(array));
}

import fetch from 'node-fetch';
import * as moment from 'moment'
import RssParser = require('rss-parser');

function getText(url: string) {
    var encoded_url = encodeURI(url);
    console.log(encoded_url);
    console.log("in get Text");
    return fetch(url).then((response) => {
        const responseBodyPromise = response.text();
        return responseBodyPromise
            .then((body: string) => { return ({ body: body, responseOk: response.ok }) })
    }).then(({ body, responseOk }) => {
        if (responseOk) {
            return body;
        }
        throw new Error("in get")
    }).catch(err => {
        console.log(err);
        return "";
    });
    throw new Error("out")
}

function convertText2Object(text: string, isDated: boolean = true): Thenable<any> {
    console.log("break3")
    const rssParser = new RssParser();
    return rssParser.parseString(text);
}
function getDated(parse_object: any) {
    /*
    var pubDates=parse_object.items.map((element: any) => moment(element.pubDate));
    parse_object.items
    */
    parse_object.items.forEach((element: any) => {
        element.pubDate = moment(element.pubDate);
    });

    var items = parse_object.items.sort((a: any, b: any) => {
        if (a.pubDate > b.pubDate) {
            return 1;
        }
        if (a.pubDate < b.pubDate) {
            return -1;
        }
        return 0;
    });
    return items;
}

function test2(url: string) {
    return getText(url).then((text: string) => {
        return convertText2Object(text)
    });
}

var url = "https://news.google.com/news/rss/headlines/section/topic/WORLD?hl=ja&gl=JP&ceid=JP:ja";
test2(url).then(parse_object => {
    const items = getDated(parse_object)
    items.forEach((element: any) => {
        console.log(element.title)
        console.log(element.pubDate)
        console.log()
    })
})
test2(url)