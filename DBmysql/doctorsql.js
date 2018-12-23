var doctorSQL = {
    insert: 'INSERT INTO doctor(name,age,img,sex,office,abstract,hsid) VALUES(?,?,?,?,?,?,?)',
    queryAll: 'SELECT * FROM doctor',
    getdoctorByysid: 'SELECT * FROM doctor WHERE ysid= ?',
    getdoctorByage: 'SELECT * FROM doctor WHERE age= ?',
    getdoctorBysex: 'SELECT * FROM doctor WHERE sex= ?',
    getdoctorByoffice: 'SELECT * FROM doctor WHERE office= ?',
    getdoctorByhsid: 'SELECT * FROM doctor WHERE hsid= ?',
    getdoctorByname: "SELECT * FROM doctor WHERE name LIKE ",
    getdoctorByoffice: "SELECT * FROM doctor WHERE office LIKE ",
    getdoctorByabstract: "SELECT * FROM doctor WHERE abstract LIKE",
    putdoctorById:'UPDATE doctor SET name= ?, age= ?, img= ?, sex= ?, office= ?, abstract= ?, hsid= ? WHERE ysid = ?',
    deletedoctorbyId: 'DELETE FROM doctor WHERE ysid= ?',
};
module.exports = doctorSQL;