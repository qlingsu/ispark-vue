const appConfig = require("./public/appConfig.js");

module.exports = {
    //部署应用包时的基本 URL
    //该字段影响html中引入资源的方式，./表示相对路径（如：src="./abc.js"） /表示绝对路径
    publicPath: process.env.NODE_ENV === 'production' ? '/online/' : './',
    //当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: "",//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    indexPath: "index.html",//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    //是否使用包含运行时编译器的 Vue 构建版本。设置true后你就可以在使用template，但是这会让你的应用额外增加 10kb 左右。
    runtimeCompiler: false,
    //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
    filenameHashing: true,
    // 生产环境是否生成 sourceMap 文件 sourceMap的详解请看末尾  
    productionSourceMap: true,
    lintOnSave: false,//是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    // webpack-dev-server 相关配置
    devServer: { // 设置代理
        hot: true, //热加载
        host: '0.0.0.0', //ip地址
        port: 8085, //端口
        https: false, //false关闭https，true为开启
        // open: true, //自动打开浏览器
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://localhost:7001',
                /* 允许跨域 */
                changeOrigin: true,
                ws: false,
                pathRewrite: {  //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            },
        },
    },
}