import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ msg: 'Forbidden' });
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ msg: 'Unauthorized' });
    }
};
