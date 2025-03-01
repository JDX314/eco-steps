module.exports = (sequelize, DataTypes) => {
    const greenevents = sequelize.define(
        "green_events",
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: { type: DataTypes.INTEGER },
            city: { type: DataTypes.STRING },
            event_name: { type: DataTypes.STRING },
            event_details: { type: DataTypes.STRING },
            created_at: { type: DataTypes.DATE },
            updated_at: { type: DataTypes.DATE },
        },
        { freezeTableName: true, timestamps: false }
    );
    greenevents.associate = function (models) {
        greenevents.belongsTo(models.users, {
            foreignKey: "user_id",
            as: "users",
        });
    };
    greenevents.selectedFields = [
        "id", 
        "user_id", 
        "city",
        "event_name",
        "event_details",
        "created_at"
    ];
    return greenevents;
};
