var mysql = require('mysql');
var config = require('./config.js');

var cnf = new config('mysql-db_conf');
var db = function(req) {
    var req = cnf.get('mysql-db.dbConfig');
    this.host = req.host;
    this.user = req.user;
    this.password = req.password;
    this.database = req.database;
    this.model_prefix   = req.model_prefix    || 'md_';
    this.model_path     = req.model_path || './application/models/';
    this.connection = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
    });
    var that = this;
    this.pool = mysql.createPool({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
    })
    this.connection.connect();
    var that = this;
    this.query = {
        'get': function(query, result) {
            var pid = that.query.newPid();
            that.pool.getConnection(function(err, conn) {
                conn.query(query, function(err, rows) {
                    that.query.processPid.push(pid);
                    result({
                        rows: rows !== '' && rows !== undefined ? rows : [],
                        length: rows !== '' && rows !== undefined ? rows.length : 0
                    });
                });
                conn.release();
            });
            return pid;
        },
        'insert': function(query, callback) {
            that.connection.query(query, null, function(err, result) {
                callback(err, result);
            });
        },
        'newPid': function(){
            var tmpPid = Math.floor((Math.random() * 1000) + 1);
            if (that.query.processPid.indexOf(tmpPid) > -1){
                while (that.query.processPid.indexOf(tmpPid) > -1){
                    tmpPid = Math.floor((Math.random() * 1000) + 1);
                }
                return tmpPid;
            }else{
                return tmpPid;
            }
        },
        'processPid': [],
        'deletePid' : function(pid){
            delete that.query.processPid[that.query.processPid.indexOf(pid)];
            return true;
        },
        'checkQueue': function(pidList, callback) {
            var c = 1;
            var id = setInterval(function() {
                if (pidList.length) {
                    pidList.forEach(function(elem, index) {
                        if (that.query.processPid.indexOf(elem) > -1) {
                            that.query.deletePid(elem);
                            if (c == pidList.length) {
                                clearInterval(id);
                                callback(true);
                            }c++;
                        }
                    });
                }else{
                    clearInterval(id);
                    callback(false);
                }
            }, 5);
        }
    },
    this.modelize = {
        'new' : function(table){

        }
    }

}
module.exports = db;