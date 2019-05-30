var courseSetSQL = {
  insert: 'INSERT INTO courseSet(id,totalWeeks,setWeek,setDate, courseNumber,openid) VALUES(?,?,?,?,?,?)',
  queryAll: 'SELECT * FROM courseSet',
  getcourseSetById: 'SELECT * FROM courseSet WHERE openid = ? ',
  deletecourseSetbyId: 'DELETE FROM courseSet WHERE openid= ?',
  putcourseSetById: 'UPDATE courseSet SET id= ?, totalWeeks= ?, setWeek= ?, setDate= ?, courseNumber= ? WHERE openid = ?'
};
module.exports = courseSetSQL;