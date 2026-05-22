

const whiteList = ['http://localhost:3500', 'http://localhost:3000']

const corsOptions = {
    origin : (origin, callback)=>{
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true)
            console.log(origin)
        }else {
            callback(new Error('Not Allowed by Cors'))
        }
    },
    optionSuccessStatus : 200
}

module.exports = corsOptions