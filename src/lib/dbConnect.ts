import { connect } from "mongoose";

const dbConnect = () =>
  connect(process.env.MONGO_DB!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

export default dbConnect;
