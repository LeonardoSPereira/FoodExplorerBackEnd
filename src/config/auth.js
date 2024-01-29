//define jwt token configuration
module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || "default",
        expiresIn: "1d"
    }
} 
