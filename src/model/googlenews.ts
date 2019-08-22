import fetch from 'node-fetch';
//const RssParser = require("rss-parser")
import RssParser = require('rss-parser');
import * as moment from 'moment';
import * as vscode from 'vscode';
import { parse } from 'path';

export default class GoogleNewsConnector {

    rssParser: RssParser = new RssParser({
        customFields: {
            item: [
                ['media:content', 'media:content'],
                ["source", "source"],
                ["description", "description"]
            ]
        }
    });
    getText(url: string) {
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

    convertText2Object(text: string, isDated: boolean = true): Thenable<any> {
        console.log("break3")
        return this.rssParser.parseString(text);
    }
    getDated(parse_object: any) {
        /*
        var pubDates=parse_object.items.map((element: any) => moment(element.pubDate));
        parse_object.items
        */
        parse_object.items.forEach((element: any) => {
            element.pubDate = moment(element.pubDate);
        });

        var items = parse_object.items.sort((a: any, b: any) => {
            if (a.pubDate > b.pubDate) {
                return -1;
            }
            if (a.pubDate < b.pubDate) {
                return 1;
            }
            return 0;
        });
        return items;
    }
    getContent(url:string): Thenable<any>{
        return this.getText(url).then((text: string) => {
            return this.convertText2Object(text)
        }).then(parse_object => {
            return this.getDated(parse_object)
        });
    }
}

