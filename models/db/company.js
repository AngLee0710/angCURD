"use strict"
const mongoose = require('mongoose');
const dbAuth = require('../db/cfg/db.js');
const Schema = mongoose.Schema; 

let thisSchema = new Schema({
	name: { type: String },
	city: { type: String },
	area: { type: String },
	address: { type: String },
	phone: { type: String },
	serviceItem: [{}]
}, {
	collection: 'Company'
});

let Owner = dbAuth.owner.model('Company', thisSchema);

function object(obj) {
	this.name = obj.name;
	this.city = obj.city;
	this.area = obj.area;
	this.address = obj.address;
	this.phone = obj.phone;
	this.serviceItem = obj.serviceItem;
}

object.prototype.save = function(callback) {

	let obj = {
		name: this.name,
		city: this.city,
		area: this.area,
		address: this.address,
		phone: this.phone,
		serviceItem: this.serviceItem
	}
	
	let newOBJ = new Owner(obj);

	newOBJ.save((err) => {
		if(err) {
			return callback(err);
		}
		return callback(null);
		
	})
	
}

object.getAll = function(callback) {
	Owner.find({}).sort('-name').exec(function(err, company) {
		if(err)
			return callback(err, null);
		else
			return callback(null, company);
	});
}

object.getCompany = function(id, callback) {
	Owner.findOne({'_id': id}, (err, datum) => {
		if(err) {
			callback(err);
		} else {
			callback(null, datum);
		}
	})
}

object.removeOne = function(id, callback) {
	Owner.deleteOne({'_id': id}, (err) => {
		if(err) 
			return callback(err, null);
		else 
			return callback(null)
		
	})
}

object.updateOne = function(data, callback) {
	Owner.updateOne({'_id': data._id}, data , (err) => {
		if(err) 
			return callback(err);
		else {
			return callback(null);
		}
	})
}



module.exports = object;