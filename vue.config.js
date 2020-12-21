module.exports = {
    publicPath:'./',
    assetsDir:'assets',
    outputDir:'dist',
    configureWebpack:{
        resolve:{
            alias:{
                '@':require('path').join(__dirname,'./src')
            }
        }
    }
}