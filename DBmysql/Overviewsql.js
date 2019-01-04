var OverviewSQL = {
  insert: 'INSERT INTO Overview(ysid,userId,time) VALUES(?,?,?)',
  queryAll: 'SELECT * FROM Overview',
  getOverviewByuserId: 'SELECT * FROM Overview WHERE userid = ? ',
};
module.exports = OverviewSQL;