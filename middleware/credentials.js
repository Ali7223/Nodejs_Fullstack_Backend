const whiteList = ['http://localhost:3500', 'http://localhost:3000'];

const credentials = (req,res,next) => {
    const origin = res.headers?.origin;
    if (whiteList.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
} 

module.exports = credentials;
