const { Client } = require("pg");

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});



try {
	client.connect().then(()=>{
	  console.log("Db connected!");
	});
} catch (error) {
	console.log("conectando error", error);
}

module.exports = { client };



