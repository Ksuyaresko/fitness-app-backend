const errorWrap = (fn) => {
    return async function (req, res, next) {
        try {
            await fn(req, res, next)
        } catch (e) {
            console.error(e)
            next(e)
        }
    }
}

module.exports = errorWrap