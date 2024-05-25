const { isAuthenticated } = require("../middleware/auth.middleware");
const {
	createUserInDb,
	findUserByEmailFromDb,
} = require("../repository/user.repository");
const { generateToken } = require("../utils/generateToken.utils");

const userRouter = require("express").Router();

userRouter.post("/create", async (req, res) => {
	try {
		const payload = req.body;
		const response = await createUserInDb(payload);
		return res.status(200).json({
			response,
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

userRouter.post("/login", async (req, res) => {
	try {
		const payload = req.body;
		const user = await findUserByEmailFromDb(payload.email);
		if (user.password !== payload.password) {
			return res.status(400).json({
				error: "Incorrect password",
			});
		}
		const token = generateToken(user.userId);
		return res.status(200).json({
			user,
			token,
		});
	} catch (error) {
		return res.status(500).json({
			error,
		});
	}
});

userRouter.get('/profile',isAuthenticated, async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

module.exports = userRouter;
