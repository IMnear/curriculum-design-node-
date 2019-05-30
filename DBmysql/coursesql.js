var courseSQL = {
  insert: 'INSERT INTO course(id,weekth,day,start, end,coursename,teacher,address,openid) VALUES(?,?,?,?,?,?,?,?,?)',
  queryAll: 'SELECT * FROM course',
  getcourseById: 'SELECT * FROM course WHERE openid = ? ',
  deletecoursebyId: 'DELETE FROM course WHERE openid= ?',
  putcourseById: 'UPDATE course SET id= ?, weekth= ?, day= ?, start= ?, end= ?, coursename= ?, teacher= ?, address= ?WHERE openid = ?'
};
module.exports = courseSQL;