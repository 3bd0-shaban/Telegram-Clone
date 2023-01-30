import jwt from "jsonwebtoken";
import Users from '../Models/Users.js';
export const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(500).json({ msg: 'not authorized' });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Users.findById(verify.id);
        next();
    } catch (error) {
        return res.status(500).json({ msg: error.message });

    }
}
export const isAdmin = async (req, res, next) => {
    try {
        const admin = req.user && req.user.isAdmin;
        if (!admin) {
            return res.status(401).json({ msg: 'Resourses not founded or it may changed to anthor url' });
        }
        next();

    } catch (error) {
        return res.status(500).json(error)
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };