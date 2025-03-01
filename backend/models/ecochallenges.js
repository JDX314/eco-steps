const utils = require("../utils");
module.exports = (sequelize, DataTypes) => {
    const ecochallenges = sequelize.define(
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
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false }
    );
    ecochallenges.associate = function (models) {
        ecochallenges.belongsTo(models.users, {
            foreignKey: "user_id",
            as: "users",
        });
    };
    ecochallenges.selectedFields = [
        "id", 
        "user_id", 
        "transportation", 
        "energy_consuption",
        "diet",
        "household_size",
        "waste_generated",
        "total_points",
        "status",
        "created_at",
        "updated_at"
    ];
    return ecochallenges;
};
