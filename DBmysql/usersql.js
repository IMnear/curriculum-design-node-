var UserSQL = {
    insert: 'INSERT INTO book(id,name) VALUES(?,?)',
    queryAll: 'SELECT * FROM book',
    getUserById: 'SELECT * FROM book WHERE id = ? ',
    deleteUserbyId:'DELETE FROM book WHERE id= ?',
};
module.exports = UserSQL;