import * as Yup from 'yup';
import {validateInputEmail, validateInputPhone, validateOnlyLetters} from "../../utilities/validatesInput";

export const schema  = Yup.object().shape({
  firstName: Yup.string().min(0).required('שם פרטי אינו תקין').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  lastName: Yup.string().required('שם משפחה אינו תקין').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  address: Yup.string().required('כתובת אינה תקינה').test('Only letters', 'Only letters and big than 3 letter', value => validateOnlyLetters(value)),
  phone: Yup.string().required('מספר הטלפון אינו תקין  ').test('Phone', 'Phone is not valid', value => validateInputPhone(value)),
  email: Yup.string().email('אימייל לא חוקי').required('אימייל לא חוקי  ').test('Email', 'accents not allowed', value => validateInputEmail(value)),
});
