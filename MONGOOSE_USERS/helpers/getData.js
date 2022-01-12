const axios = require("axios");


const getdata = async () => {
	return await axios('https://jsonplaceholder.typicode.com/users')
		.then(json => json.data);
}

module.exports = {
	getdata
}