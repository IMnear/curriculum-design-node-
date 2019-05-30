var todoSQL = {
  insert: 'INSERT INTO todo(id,item,due,remarks, priority,created,openid) VALUES(?,?,?,?,?,?,?)',
  queryAll: 'SELECT * FROM todo',
  gettodoById: 'SELECT * FROM todo WHERE openid = ? ',
  deletetodobyId: 'DELETE FROM todo WHERE openid= ?',
  puttodoById: 'UPDATE todo SET id= ?, item= ?, due= ?, remarks= ?, priority= ?, created= ? WHERE openid = ?'
};
module.exports = todoSQL;