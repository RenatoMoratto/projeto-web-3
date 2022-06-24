const { DB_CONNECTION_STRING, PORT, JWT_SECRET } = process.env;

module.exports = {
	db_connection_string: DB_CONNECTION_STRING,
	port: PORT,
	jwt_secret: JWT_SECRET,
};
