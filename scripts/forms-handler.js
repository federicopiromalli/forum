const forms_handler = {
  clear_fields_by_name(fields_name) {
    document
      .querySelectorAll(`input[name="${fields_name}"]`)
      .forEach((field) => {
        field.value = "";
      });
  },
};
