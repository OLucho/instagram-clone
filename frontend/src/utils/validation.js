/* eslint-disable import/prefer-default-export */
export function getValidationErrors(err) {
  const validationError = {};
  err.inner.forEach((error) => {
    validationError[error.path] = error.message;
  });
  return validationError;
}
