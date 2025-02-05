import {object, string, number, date, InferType, bool, ref} from 'yup';

export const recipientSchema_test = object({
    id: number().positive().integer(),
    firstName: string().required().min(2).default("andy"),
    lastName: string().required().min(2).default("warhol"),
    city: string(),
    country: string(),
    // dob: string().max(new Date()).default(new Date("1940/1/3")),
    picture: string().nullable(),
    password: string().required().min(8).default("fjdslkfj3e948"),
    email: string().email().required().default("and2y@warhol.com"),
    story: string().default(""),
    charity_id_recipient: number().positive().integer(),
    agreeToTerms: bool().default(true)
});

export const recipientSchema = object({
    id: number().positive().integer(),
    firstName: string().required("First name is required").min(2, "First name must be at least 2 characters"),
    lastName: string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
    city: string(),
    country: string(),
    // dob: string(),
    picture: string().nullable(),
    password: string().required("Password is required").min(8, "Password must be at least 8 characters").nullable(),
    passwordConfirm: string().required("Password confirmation is required").oneOf([ref("password")]).nullable(),
    email: string().email("Invalid email").required("Email is required"),
    story: string().ensure(),
    charity_id_recipient: number().positive().integer(),
    agreeToTerms: bool().default(true),
});