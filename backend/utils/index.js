const bcrypt = require("bcrypt");
module.exports = {
    genHash(data) {
        let salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(data, salt);
    },
    response: require("./response"),
    encryptDecrypt: require("./encryptDecrypt"),
    cryptoAlgo: require("./cryptojs"),
    generateCode(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
        }
        return code;
    }
};
