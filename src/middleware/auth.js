const jwt = require("jsonwebtoken");

module.exports = function (request, response, next) {
    const token = request.header("token")
    if(!token) return response.status(401).json({message: "Auth Error"});
    try {
        const decoded = jwt.verify(token, "secret")
        request.user = decoded.user;

        console.log(request.user)
        next();
    } catch (e) {
        console.log(e);
        response.status(419).send({message: "Invalid Token"});
    }
}
