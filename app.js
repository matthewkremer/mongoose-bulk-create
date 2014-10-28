var mongoose = require('mongoose');
var mbc = require('mongoose-bulk-create');
mongoose.connect('mongodb://localhost/test/');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	mbc.patchMongoose(mongoose);
  
	var kittySchema = mongoose.Schema({
	    name: String
	});

	var Kitten = mongoose.model('Kitten', kittySchema)

	Kitten.create({name: 'Jerry'});

	Kitten.bulkCreate([{name: 'TEST1'}, {name: 'TEST2'}], function(err, docs){

		var q = Kitten.findOne({ 'name': 'TEST1' });

		q.exec(function(err, kitten){
			if (err){
				console.log("ERR", err);
			}else{
				console.log(kitten);
			}
		});

		Kitten.findOne({ 'name': 'TEST2' }, function(err, res){
			if (err){
				console.log("ERR", err);
			}else{
				console.log(res.name);
			}
		});

		var myKitten = Kitten.findOne({ 'name': 'Jerry' }, function(err, res){
			if (err){
				console.log("ERR", err);
			}else{
				console.log(res.name);
			}
		});

		console.log(docs);
	});

});