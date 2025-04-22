import jwt from 'jsonwebtoken';

const jwtsign = (payload,secret) => {
    const {name,email,password,admin,id} = payload;
    const token = jwt.sign({name,email,password,admin,id},secret, {expiresIn: '1h'});
    return token;
}
export default jwtsign;
