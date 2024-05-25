const { findUserByIdFromDb } = require("../repository/user.repository");
const { verifyToken } = require("../utils/verifyToken.utils")

exports.isAuthenticated = async (req, res, next) => {
    try {
        const decodedToken = verifyToken(req, res);
        const user = await findUserByIdFromDb(decodedToken.userId);
        req.user = user;
        next()
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}