import db from '../../../utils/Database'
import User from '../../../models/User'

db.connect()

export default async (req, res) => {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const users = await User.find()

                return res.status(200).json({
                    status: "OK",
                    message: null,
                    data: users
                })
            } catch (error) {
                return res.status(500).json({
                    status: "OK",
                    message: error.message,
                    errors: error 
                })
            }
            break;
        case 'POST':
            try {
                const userCreate = await User.create(req.body)

                return res.status(201).json({
                    status: "OK", 
                    message: "User created",
                    data: userCreate.id
                })
            } catch (error) {
                return res.status(500).json({
                    status: "OK",
                    message: error.message,
                    errors: error 
                })
            }
            break;
        default:
            return res.status(403).json({
                status: "FAIL",
                message: req.method +  " method not allowed",
                data: null
            })
            break;
    }
}