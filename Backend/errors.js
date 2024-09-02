class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
module.exports = AppError;
// Create Operation
// 201 Created: The request has been fulfilled, resulting in the creation of a new resource.
// 400 Bad Request: The server could not understand the request due to invalid syntax.
// 409 Conflict: The request could not be completed due to a conflict with the current state of the target resource (e.g., attempting to create a resource that already exists).
// Read Operation
// 200 OK: The request has succeeded.
// 404 Not Found: The server can not find the requested resource.
// Update Operation
// 200 OK: The request has succeeded.
// 204 No Content: The server successfully processed the request, but is not returning any content.
// 400 Bad Request: The server could not understand the request due to invalid syntax.
// 404 Not Found: The server can not find the requested resource.
// 409 Conflict: The request could not be completed due to a conflict with the current state of the target resource.
// Delete Operation
// 200 OK: The request has succeeded.
// 204 No Content: The server successfully processed the request, but is not returning any content.
// 404 Not Found: The server can not find the requested resource.
