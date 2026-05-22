const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req?.roles){
            return res.sendStatus(401).json({ message: "Unauthorized" });
        }
        const rolesArray = [...allowedRoles];
        //console.log(rolesArray);
       // console.log("User roles:", req.roles);
        const hasRole = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!hasRole) {
            return res.sendStatus(401).json({ message: "Forbidden" });
        }
        next();
    };
};
module.exports = verifyRoles;
