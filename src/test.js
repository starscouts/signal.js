const marked = require('marked');

let text = '*hello **world***\n```\ntest<br>\n```\n[Google](https://google.com)\n* Test\n  * Te**st**\n\n<s>test</s>';

let renderer = {};
renderer['strong'] = renderer['em'] = renderer['codespan'] = renderer['code'] = renderer['del'] = renderer['tablerow'] = renderer['tablecell'] = renderer['del'] = renderer['heading'] = renderer['blockquote'] = (text) => text;
renderer['hr'] = () => "—————————";
renderer['link'] = (href, title, text) => (title ?? text) + ": " + href;
renderer['text'] = (text) => text.replace(/^( *)\* *(.*)/gm, "$1- $2");

marked.use({
    async: false,
    mangle: false,
    headerIds: false,
    renderer
});

console.log(marked.parseInline(text).replaceAll("<br>", "").replace(/(~~(.*)~~|<del>(.*)<\/del>|<s>(.*)<\/s>)/gm, "$2$3$4"));
let plain = marked.parseInline(text).replaceAll("<br>", "").replace(/(~~(.*)~~|<del>(.*)<\/del>|<s>(.*)<\/s>)/gm, "$2$3$4");

let styles = [];

renderer = {};
renderer['strong'] = (text) => {
    let start = -1;
    plain.replace(text, (_, offset) => { start = offset; });

    styles.push({
        style: "BOLD",
        start,
        length: text.length
    });
};
renderer['em'] = (text) => {
    let start = -1;
    plain.replace(text, (_, offset) => { start = offset; });

    styles.push({
        style: "ITALIC",
        start,
        length: text.length
    });
};
renderer['codespan'] = renderer['code'] = (text) => {
    let start = -1;
    plain.replace(text, (_, offset) => { start = offset; });

    styles.push({
        style: "MONOSPACE",
        start,
        length: text.length
    });
};
renderer['del'] = () => {
    let start = -1;
    plain.replace(text, (_, offset) => { start = offset; });

    styles.push({
        style: "STRIKETHROUGH",
        start,
        length: text.length
    });
};

marked.use({
    async: false,
    mangle: false,
    headerIds: false,
    renderer
});

marked.parseInline(text);
styles = styles.filter(i => i.start !== -1);