const utils = require("../utils");
module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        "users",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            first_name: { type: DataTypes.STRING },
            last_name: { type: DataTypes.STRING },
            email: { type: DataTypes.STRING },
            city: { type: DataTypes.STRING },
            otp: { type: DataTypes.STRING },
            password: { 
                type: DataTypes.STRING,
                set(password) {
                    if (password) {
                        const encrypted = utils.genHash(password);
                        this.setDataValue("password", encrypted);
                    }
                },
            },
            status: { type: DataTypes.BOOLEAN },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false }
    );
    users.selectedFields = [
        "id", 
        "first_name", 
        "last_name", 
        "email",
        "city",
        "status",
        "created_at",
        "updated_at"
    ];
    return users;
};
