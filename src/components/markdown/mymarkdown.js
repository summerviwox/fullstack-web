const md = require('markdown-it')({
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
    .use(require('markdown-it-highlightjs'),{
        auto:true,
        code:true,
        register:null,
        inline:false,
        hljs:require('highlight.js')
    })
    .use(require('markdown-it-multimd-table'))

export default md
