
const md = require('mymarkdownit')({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     true,        // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks:       true,        // Convert '\n' in paragraphs into <br>
    langPrefix:   '',  // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify:      true,        // Autoconvert URL-like text to links
    typographer:  true,        // Enable some language-neutral replacement + quotes beautification

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
})
    .use(require('markdown-it-highlightjs/core'),{
        auto:true,
        code:true,
        register:null,
        inline:false,
        hljs:require('myhljs')
    })
    .use(require('markdown-it-multimd-table'),{
        multiline:  true,
        rowspan:    true,
        headerless: true,
    })

//新界面打开
var defaultRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // If you are sure other plugins can't add `target` - drop check below
    var aIndex = tokens[idx].attrIndex('target');

    if (aIndex < 0) {
        tokens[idx].attrPush(['target', '_blank']); // add new attribute
    } else {
        tokens[idx].attrs[aIndex][1] = '_blank';    // replace value of existing attr
    }

    // pass token to default renderer.
    return defaultRender(tokens, idx, options, env, self);
};

export default md
