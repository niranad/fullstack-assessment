import flex from '../../util/flex';

export default {
  formContainer: {
    ...flex('column', 'center', 'center'),

  },

  formWrap: {
    ...flex('column', 'center', 'center', '1rem'),
    
  },
  
  formHeader: {},
  
  form: {
    ...flex('column', 'center', 'center', '1rem'),
    
  },

  input: {},

  formControl: {},

  checkbox: {
    ...flex('row', 'flex-start', 'center', '-1rem')
  },

  submit: {}
}