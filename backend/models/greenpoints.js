module.exports = (sequelize, DataTypes) => {
    const greenpoints = sequelize.define(
        "green_points",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER },
            reward_points: { type: DataTypes.INTEGER },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false }
    );
    greenpoints.associate = function (models) {
        greenpoints.belongsTo(models.users, {
            foreignKey: "user_id",
            as: "users",
        });
    };
    greenpoints.selectedFields = [
        "id", 
        "user_id", 
        "reward_points",
        "created_at"
    ];
    return greenpoints;
};
