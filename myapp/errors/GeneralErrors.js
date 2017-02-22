var util = require('util');

var Internal = function(data) {
  this.name = 'InternalError';
  this.message = data || 'Internal Error';
  this.code = 500;
};

util.inherits(Internal, Error);

var NotFound = function(data) {
  this.name = 'NotFoundError';
  this.message = data || 'Not Found';
  this.code = 404;
};

util.inherits(NotFound, Error);

var Database = function(data) {
  this.name = 'DatabaseError';
  this.message = data || 'Database Error';
  this.code = 500;
};

util.inherits(Database, Error);

var Parameter = function(data) {
  this.name = 'ParameterError';
  this.message = data || 'Invalid Parameters';
  this.code = 400;
};

util.inherits(Parameter, Error);

var Existed = function(data) {
  this.name = 'ExistedError';
  this.message = data || 'Object Existed';
  this.code = 400;
};

util.inherits(Existed, Error);

var Server = function(data) {
  this.name = 'ServerError';
  this.message = data || 'Server Error';
  this.code = 500;
};

util.inherits(Server, Error);

var APIService = function(data) {
  this.name = 'APIServiceError';
  this.message = data || 'API Service Error';
  this.code = 400;
};

util.inherits(APIService, Error);


module.exports = {
  NotFound: NotFound,
  Parameter: Parameter,
  Database: Database,
  Server: Server,
  APIService : APIService,
  Existed: Existed,
  Internal: Internal
};
