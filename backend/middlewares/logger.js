const loggerMiddleware = (req, res, next) => {
    const { url, ip, method, hostname, port } = req;

    console.log(`${new Date().toISOString()} Request ${method}, Host: ${hostname}:${port} to endpoint ${url} from ip ${ip}`)

    next();
}

module.exports = loggerMiddleware;