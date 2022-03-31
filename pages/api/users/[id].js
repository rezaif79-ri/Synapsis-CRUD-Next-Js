import db from "../../../utils/Database";
import User from "../../../models/User";

db.connect();

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try { 
        const user = await User.findOne({ _id: id }).limit(1);
        if (!!user) {
          return res.status(200).json({
            status: "OK",
            message: null,
            data: user,
          });
        } else {
          return res.status(404).json({
            status: "FAIL",
            message: "User not found",
            data: null,
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: "OK",
          message: error.message,
          errors: error,
        });
      }

      break;
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!!user) {
          return res.status(200).json({
            status: "OK",
            message: "Update success",
            data: user,
          });
        } else {
          return res.status(404).json({
            status: "FAIL",
            message: "User not found",
            data: null,
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: "OK",
          message: error.message,
          errors: error,
        });
      }
      break;
    case "DELETE":
      try {
        const deleted = await User.deleteOne({ _id: id });
        if (!!deleted) {
          return res.status(200).json({
            status: "OK",
            message: "User deleted",
            data: null,
          });
        } else {
          return res.status(404).json({
            status: "FAIL",
            message: "User not found",
            data: null,
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: "OK",
          message: error.message,
          errors: error,
        });
      }

      break;
    default:
      return res.status(403).json({
        status: "FAIL",
        message: req.method + " method not allowed",
        data: null,
      });
      break;
  }
};
