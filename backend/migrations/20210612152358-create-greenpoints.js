"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable(
            "green_points",
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                user_id: { type: DataTypes.INTEGER },
                reward_points: { type: DataTypes.INTEGER },
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
        ).then(() =>
            queryInterface.addConstraint("green_points", {
                fields: ["user_id"],
                type: "foreign key",
                name: "users_green_points_fkey",
                references: {
                    table: "users",
                    field: "id",
                },
                onDelete: "cascade",
                onUpdate: "cascade",
            })
        );
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("green_points");
    },
};
