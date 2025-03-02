"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable(
            "eco_challenges",
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                user_id: { type: DataTypes.INTEGER },
                transportation: { type: DataTypes.BOOLEAN },
                energy_consuption: { type: DataTypes.BOOLEAN },
                diet: { type: DataTypes.BOOLEAN },
                household_size: { type: DataTypes.BOOLEAN },
                waste_generated: { type: DataTypes.BOOLEAN },
                total_points: { type: DataTypes.INTEGER },
                status: { type: DataTypes.STRING },
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
            queryInterface.addConstraint("eco_challenges", {
                fields: ["user_id"],
                type: "foreign key",
                name: "users_eco_challenges_fkey",
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
        await queryInterface.dropTable("eco_challenges");
    },
};
