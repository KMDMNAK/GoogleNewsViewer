"use strict";
exports.__esModule = true;
function test1() {
    var array = {
        items: [
            { e1: "a", e2: "b" },
            { e1: "c", e2: "d" },
            { e1: "e", e2: "f" }
        ]
    };
    console.log(array);
    function change(array) {
        array.items.forEach(function (element) {
            element.e1 = "CHANGED";
        });
        return array;
    }
    console.log(change(array));
}
var node_fetch_1 = require("node-fetch");
var moment = require("moment");
function getText(url) {
    var encoded_url = encodeURI(url);
    console.log(encoded_url);
    console.log("in get Text");
    return node_fetch_1["default"](url).then(function (response) {
        var responseBodyPromise = response.text();
        return responseBodyPromise
            .then(function (body) { return ({ body: body, responseOk: response.ok }); });
    }).then(function (_a) {
        var body = _a.body, responseOk = _a.responseOk;
        if (responseOk) {
            return body;
        }
        throw new Error("in get");
    })["catch"](function (err) {
        console.log(err);
        return "";
    });
    throw new Error("out");
}
var RssParser = require("rss-parser");
function convertText2Object(text, isDated) {
    if (isDated === void 0) { isDated = true; }
    console.log("break3");
    var rssParser = new RssParser();
    return rssParser.parseString(text);
}
function getDated(parse_object) {
    /*
    var pubDates=parse_object.items.map((element: any) => moment(element.pubDate));
    parse_object.items
    */
    parse_object.items.forEach(function (element) {
        element.pubDate = moment(element.pubDate);
    });
    var items = parse_object.items.sort(function (a, b) {
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
function test2(url) {
    return getText(url).then(function (text) {
        return convertText2Object(text);
    });
}
var url = "https://news.google.com/news/rss/headlines/section/topic/WORLD?hl=ja&gl=JP&ceid=JP:ja";
test2(url).then(function (parse_object) {
    var items = getDated(parse_object);
    items.forEach(function (element) {
        console.log(element.title);
        console.log(element.pubDate);
        console.log();
    });
});
test2(url);
