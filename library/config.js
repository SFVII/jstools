var fs = require('fs');
/*
	NodeJS get configuration FROM json.
	Config folder should be on the root path application. All configuration file have to be a JSON file
	Load a specific object : 
		var config = require('./config.js')
		var cnf = new config('filename')
		eg : var tmp = cnf.get('mysql-db.dbConfig') 
		{
			mysql-db : {
				dbConfig : {
						test: 'Im here'
				}
			}
		}
		get direct access to dbConfig eg: console.log(tmp.test) - 'Im here';
*/

module.exports = config = function(file){
	if (!file) throw 'Error :Please set a config file name without extension, however your file should have a json extension;';
	this.conf = new Object();
	var that = this;
	this.conf = JSON.parse(fs.readFileSync('./config/'+file+'.json', 'utf8', "utf8"));
	this.get = function(key){
				if (key){
					if (key.indexOf('.') > -1){
						key = key.split('.');
						var buff = that.conf;
						key.forEach(function(elem){
							buff = that.getKey(buff, elem)
						});
						return buff;
					}else if (that.conf[key]) return that.conf.key;
					else throw 'Missing key or invalid configuration file';
				}else return that.conf;
			}
	this.getKey = function(buff, key){
		if ((buff[key] !== undefined && buff[key] !== null && buff[key]) || (typeof buff[key] == 'object')) return buff[key];
		else throw 'Error this data doesn\'t exist';
	}
}