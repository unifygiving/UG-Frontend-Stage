import * as Yup from 'yup';

export default Yup.object().shape({
    firstName: Yup.string().min(2, "First name must be at least 2 characters").max(40),
    lastName: Yup.string().min(2, "Last name must be at least 2 characters").max(40),
    country: Yup.string().min(2),
    city: Yup.string().min(2),
    email: Yup.string().email('Invalid email'),
    confirmEmail: Yup.string(),
    location: Yup.string().min(2, "Location must be at least 2 characters").max(40),
});