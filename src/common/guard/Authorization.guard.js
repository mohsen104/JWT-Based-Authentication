import UserMessage from '../../modules/auth/user.message.js';
import UserModel from '../../modules/auth/user.model.js';
import { configDotenv } from 'dotenv';
import { verifyToken } from '../utils/functions.js';
configDotenv();

const AuthorizationGuard = async (req, res, next) => {
    try {
        const { access_token } = req.cookies;
        if (!access_token) return res.status(401).json({ message: UserMessage.Unauthorized });
        const data = verifyToken(access_token);
        if (data?.phone) {
            const user = await UserModel.findOne({ phone: data.phone });
            if (!user) return res.status(401).json({ message: UserMessage.NotFoundUser });
            if (!user.verify) return res.status(401).json({ message: UserMessage.NotVerifiedUser });
            req.user = user;
            return next();
        }
        return res.status(401).json({ message: UserMessage.InvalidToken })
    } catch (error) {
        next(error);
    }
};

export default AuthorizationGuard;