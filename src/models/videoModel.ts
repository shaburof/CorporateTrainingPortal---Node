import { Model, DataTypes } from 'sequelize';
import { pool } from './pool';
import dotenv from 'dotenv';
dotenv.config();

class VideoModel extends Model { }

VideoModel.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file: DataTypes.STRING,
    path: DataTypes.STRING,
    date: {
        type: DataTypes.DATE,
        get: function (this) {
            const rawValue: Date = this.getDataValue('date');
            return rawValue.toLocaleString().split(',')[0];
        }
    }
}, { sequelize: pool, modelName: 'video' });

export { VideoModel }