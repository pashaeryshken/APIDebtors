const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Debtors = require("../models/debtors");
const expiresIn = 3600;

generateToken = (user) => {
    return jwt.sign(user,
        "secret",
        {
            expiresIn: expiresIn
        });
};

exports.signup = async function (body) {

    const {userName, email, password} = body;

    let user = await User.findOne({
        email
    });
    if (user) {
        throw {message: "USER_EXISTS"};
    }
    user = new User({userName, email, password});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken({
        user: {
            id: user.id
        }
    });

    return {token, expiresIn}


};

exports.login = async function (body) {

    const {email, password} = body;
        let user = await User.findOne({
            email
        });
        if (!user) {
            throw {message: "USER_NOT_FOUND"};
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw {message: "INVALID_PASSWORD"};
        }

        const token = generateToken({
            user: {
                id: user.id
            }
        });
        return {token, expiresIn};
};

exports.getMe = async function (id) {
    try {
        const user = await User.findById(id, '-password -people -_id');
        const debtors = await Debtors.find({userId: id}, "-userId");
        await debtors.map((debtor) => {
            if (debtor.status !== 2) {
                if (debtor.isI === true) {
                    user.iTotalAmount += debtor.amount;
                } else {
                    user.debtorsTotal += debtor.amount;
                }
            }
        });

        return {
            userName: user.userName,
            email: user.email,
            iTotalAmount: user.iTotalAmount,
            debtorsTotal: user.debtorsTotal,
            createAt: user.createAt
        }
    } catch (e) {
        throw ({message: "error in Fetching user"})
    }
};

exports.refreshToken = async function (id) {
    const token = generateToken({
        user: {
            id: id
        }
    });
    return {token, expiresIn}
}



