module.exports = (sequelize, DataTypes) => {
    const carbonfootprint = sequelize.define(
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
            date_recorded: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            category: { type: DataTypes.STRING },
            comments: { type: DataTypes.STRING },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false }
    );
    carbonfootprint.associate = function (models) {
        carbonfootprint.belongsTo(models.users, {
            foreignKey: "user_id",
            as: "users",
        });
    };
    carbonfootprint.selectedFields = [
        "id", 
        "user_id", 
        "transportation",
        "energy_consuption",
        "diet",
        "household_size",
        "waste_generated",
        "carbon_emission",
        "carbon_footprint_score",
        "date_recorded",
        "category",
        "comments",
        "created_at"
    ];
    return carbonfootprint;
};
