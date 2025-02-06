import jwt from 'jsonwebtoken'
const authMw = async (req, res, next) => {
    let token = req.headers.authorization.split(" ")[1]
    try {
        if (!token) {
            return res.status(401).json({ msg: "Token Invalid!" })
        }
        else {
            var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.body.userId = decoded.userId
            next()
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "Error in Token Authentication!" })
    }
}

export { authMw }