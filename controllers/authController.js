const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');
const sendError = require('../utils/sendError');

const generateJWT = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '20d' });

exports.signup = async (req, res) => {
    const { email, password, username } = req.body;

    if (!email || !password) {
        return sendError(401, 'Please provide an email and a password', res);
    }

    let user;

    try {
        user = await User.create({
            email, 
            password,
            username
        });
    } catch (error) {
        return sendError(400, error.message, res);
    }

    const token = generateJWT(user);

    res.status(201).json({
        message: 'success',
        token,
        data: { 
            user
        }
    });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendError(401, 'Please provide an email and a password');
    }

    const user = await User.findOne({ email, password });

    if (!user) {
        return sendError(404, 'There is no user with given email and password', res);
    }

    const token = generateJWT(user);

    return res.status(200).json({
        message: 'success',
        token,
        data: {
            user
        }
    });
};

exports.verifyAccess = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        ([, token] = req.headers.authorization.split(' '));
    }

    if (!token) {
        return sendError(401, 'You are not authorized to perform this action, plase login to access', res);
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return sendError(401, 'The user with the given jwt no longer exists', res);
    }

    req.user = currentUser;

    next();
};