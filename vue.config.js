module.exports = {
    publicPath:'./',
    assetsDir:'assets',
    outputDir:process.env.VUE_APP_DIST,
    configureWebpack:(config)=>{
        return {
            resolve:{
                alias:{
                    '@':require('path').join(__dirname,'./src')
                }
            }
        }
    }
}