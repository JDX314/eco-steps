"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable(
            "users",
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                first_name: { type: DataTypes.STRING },
                last_name: { type: DataTypes.STRING },
                email: { type: DataTypes.STRING },
                city: { type: DataTypes.STRING },
                password: { type: DataTypes.STRING },
                otp: { type: DataTypes.STRING },
                status: { type: DataTypes.BOOLEAN, defaultValue: true },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                },
                updated_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
                },
            },
            { timestamps: false }
        );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("users");
    },
};
