#!/usr/bin/env node

import fetch from 'node-fetch';
import jsdom from 'jsdom';
import textlint from 'textlint';

const { JSDOM } = jsdom;
const { TextLintEngine } = textlint;

(async() => {
    const target = 'body'
    const res = await fetch(process.argv[2])
    const html = await res.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    const post = document.querySelector(target)
    const text = post.textContent.trim()

    const engine = new TextLintEngine({
        rulePaths: ["node_modules/textlint-rule-prh"]
    })

    engine.executeOnText(text).then(results => {
        if (engine.isErrorResults(results)) {
            const output = engine.formatResults(results)
            console.log(output)
        } else {
            console.log('エラーはありませんでした。')
        }
    })
})()
