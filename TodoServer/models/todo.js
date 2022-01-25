const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Todo extends Model {
  static init(sequelize) {
    return super.init(
      {
        // id가 기본적으로 들어있다.
        text: {
          type: DataTypes.STRING(100),
          allowNull: false, // 필수
        },
      },
      {
        modelName: "Todo",
        tableName: "todos",
        paranoid: true,
        sequelize,
      }
    );
  }
};
