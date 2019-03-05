const mongoose = require('mongoose');
module.exports = {
	owner: mongoose.createConnection('mongodb://angleeOwner:2842l3u03@127.0.0.1:30678/test?ssh=true', { useNewUrlParser: true })
}
