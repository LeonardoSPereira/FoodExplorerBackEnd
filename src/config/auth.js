//define jwt token configuration
module.exports = {
    jwt: {
        secret: process.env.JWT_TOKEN || "default",
        expiresIn: "1d"
    }
} 
