const INPUT_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  TEL: 'phone',
  DATE: 'date'
};

const ATTS = {
  CLASS_DISPLAY_CONTAINER: 'display-container',
  CLASS_CHEVRON: 'expand-options',
  CLASS_PRIMARY_CONTAINER: 'add-custom-field-container',
  CLASS_INPUTS_CONTAINER: 'add-custom-field-inputs-container',
  TYPE_SELECT_LABEL: 'Type',
  TYPE_SELECT_ID: 'custom-field-input-type',
  TYPE_SELECT_OPTIONS: Object.values(INPUT_TYPES),
  LABEL_INPUT_LABEL: 'Label',
  LABEL_INPUT_PLACEHOLDER: 'Website',
  VALUE_INPUT_PLACEHOLDER: 'example.com'
};

export { INPUT_TYPES, ATTS };
