var backendErrors = {
  email: {
    errors: [
      {
        message: "Can't be Blank",
      },
    ],
  },
  passwords: {
    errors: [
      {
        message: "Must contain symbols in different case",
      },
      {
        message: "Must be at least 8 symbols length",
      },
    ],
  },
  passwordConfirmation: {
    errors: [
      {
        message: "Must match with password",
      },
    ],
  },
};
var humanReadableBackendErrors = _.map(backendErrors, function (value, field) {
  console.log("field,value", field, value);
  var fieldMessages = _.chain(value.errors).map("message").value();
  return _.upperFirst(field) + ": " + fieldMessages;
});
console.log("humanReadableBackendErrors", humanReadableBackendErrors);
