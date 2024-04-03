const FIELD_TYPES = {
  TEXT: 'text',
  EMAIL: 'email',
  TEL: 'tel',
  DATE: 'date',
  AREA: 'text-area'
};

const ATTS = {
  CLASS_DISPLAY_CONTAINER: 'display-container',
  CLASS_CHEVRON: 'expand-options',
  CLASS_PRIMARY_CONTAINER: 'add-custom-field-container',
  CLASS_INPUTS_CONTAINER: 'add-custom-field-inputs-container',
  TYPE_SELECT_LABEL: 'Type',
  TYPE_SELECT_ID: 'custom-field-input-type',
  TYPE_SELECT_OPTIONS: Object.values(FIELD_TYPES),
  LABEL_INPUT_LABEL: 'Label'
};

export { FIELD_TYPES, ATTS };
