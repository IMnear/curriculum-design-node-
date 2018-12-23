var hospitalSQL = {
    insert: 'INSERT INTO hospital(name,img,address,abstract) VALUES(?,?,?,?)',
    queryAll: 'SELECT * FROM hospital',
    gethospitalByhsid: 'SELECT * FROM hospital WHERE hsid= ?',
    gethospitalByname: "SELECT * FROM hospital WHERE name LIKE ",
    gethospitalByaddress: "SELECT * FROM hospital WHERE address LIKE ",
    gethospitalByabstract: "SELECT * FROM hospital WHERE abstract LIKE",
    puthospitalById:'UPDATE hospital SET name= ?, img= ?, address= ?, abstract= ? WHERE hsid = ?',
    deletehospitalbyId: 'DELETE FROM hospital WHERE hsid= ?',
};
module.exports = hospitalSQL;