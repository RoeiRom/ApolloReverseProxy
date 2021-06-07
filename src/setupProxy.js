const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    
    app.use(
        '/sockets/*',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            ws: true,
            pathRewrite: (path) => path.replace('/sockets', ''),
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        '/db/*', 
        createProxyMiddleware({
            target: 'http://localhost:8080',
            pathRewrite: (path) => path.replace('/db', ''),
            secure: false,
            changeOrigin: true
        })
    )
}