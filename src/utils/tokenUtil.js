import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';

export function getDataFromToken(request) {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        throw new Error(error.message);
    }
}

export function getUserDataFromToken() {
    const cookieStore = cookies();
    if( ! cookieStore.has('token') ) {
        return false;
    }

    const token = cookieStore.get('token').value;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if( ! decodedToken ) {
            return false;
        }

        const { iat, exp, ...user } = decodedToken;
        return user;
    } catch (error) {
        if( error instanceof jwt.TokenExpiredError ) {
            return 'token_expired';
        }
        return false;
    }
}