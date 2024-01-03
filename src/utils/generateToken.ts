
import jwt from "jsonwebtoken"
import { Settings } from "../config/settings"

const generateToken = (user_id: string) => {
    const token = jwt.sign({ user_id }, Settings.auth.JWT_SECRET_KEY as string, { algorithm: "HS256" })

    return token
}

export default generateToken