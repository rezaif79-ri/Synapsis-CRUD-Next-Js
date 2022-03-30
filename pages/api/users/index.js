import db from '../../../utils/Database'

db.connect()

export default async (req, res) => {
    return res.status(200).json({status:"OK", message:"connect"})
}