// To make next detect files changes when running in a docker container
module.exports = {
    webpackDevMiddleware : config => {
        config.watchOptions.poll = 300;
        return config
    }
}