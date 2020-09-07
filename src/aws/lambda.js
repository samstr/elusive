export const errorResponse = (msg, code) => ({
  body: msg || 'Error',
  statusCode: code || 500,
});

export const successResponse = (msg, code) => ({
  body: msg || 'Success',
  statusCode: code || 200,
});
