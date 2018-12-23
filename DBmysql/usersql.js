var UserSQL = {
    insert: 'INSERT INTO user(username,password) VALUES(?,?)',
    queryAll: 'SELECT * FROM user',
    getUserById: 'SELECT * FROM user WHERE id = ? ',
    deleteUserbyId:'DELETE FROM user WHERE id= ?',
    putUserById:'UPDATE user SET username= ?, password= ?, rfid= ?, age= ?, adress= ?, sex= ?, phone= ? WHERE id = ?'
};
module.exports = UserSQL;