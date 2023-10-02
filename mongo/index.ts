import mongoose from 'mongoose';

export interface IMongoProjectionFields {
  [key: string]: 0 | 1
  // 0 - To hide that fields.
  // 1 - To show that feilds.
}

const DatabaseConnection = () => {
  let mongoConnectionURL = process.env.DB_CONNECTION_URL;
  mongoose.connect(mongoConnectionURL)
    .then((data) => {
      console.log("Database Server Connected");
    })
    .catch((err) => {
      console.log("Database Connection Error", err);
    });
}

export default DatabaseConnection;
