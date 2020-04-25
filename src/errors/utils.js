export const createErrorResponseArray = (errors) => ({
  errors: errors.map((err) => {
    const obj = {
      name: err.name,
      message: err.message,
    };

    if (err.fields) {
      obj.fields = err.fields;
    }

    return obj;
  }),
});

export const genericErrors = (errors, includingFields) => {
  if (!errors || !errors.length) return [];
  return errors.filter(
    (err) =>
      !err.fields ||
      (err.fields &&
        err.fields.length &&
        includingFields &&
        includingFields.length &&
        err.fields.some((field) => includingFields.includes(field)))
  );
};

export const fieldErrors = (errors, field) => {
  if (!errors || !errors.length) return [];
  return errors.filter((err) => {
    return err.fields && err.fields.length && err.fields.includes(field);
  });
};
