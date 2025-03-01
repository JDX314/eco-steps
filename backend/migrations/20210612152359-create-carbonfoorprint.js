"use strict";
module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable(
            "carbon_footprint",
            {
                id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                user_id: { type: DataTypes.INTEGER },
                transportation: { type: DataTypes.INTEGER },
                energy_consuption: { type: DataTypes.INTEGER },
                diet: { type: DataTypes.STRING },
                household_size: { type: DataTypes.INTEGER },
                waste_generated: { type: DataTypes.INTEGER },
                carbon_emission: { type: DataTypes.FLOAT },
                carbon_footprint_score: { type: DataTypes.STRING },
                date_recorded: { type: DataTypes.DATE },
                category: { type: DataTypes.STRING },
                comments: { type: DataTypes.STRING },
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
            queryInterface.addConstraint("carbon_footprint", {
                fields: ["user_id"],
                type: "foreign key",
                name: "users_carbon_footprint_fkey",
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
        await queryInterface.dropTable("carbon_footprint");
    },
};
