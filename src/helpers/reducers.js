export const formInitState = {
  isFirstNameVerified: false,
  isLastNameVerified: false,
  isNameVerified: false,
  isEmailVerified: false,
  isPasswordVerified: false,
  isNewPasswordVerified: false,
  isConfirmPasswordVerified: false,
  isConfirmEmailVerified: false,
  isLocationVerified: false,
  isFormChanged: false,
  inputName: '',
  passwordVisibility: {
    isShowPassword: false,
    isShowNewPassword: false,
    isShowConfirmPassword: false,
  },
  password: '',
  confirmPassword: '',
  email: '',
  confirmEmail: '',
  isErrorConfirmPassword: true,
  isErrorConfirmEmail: true,
};

export const formReducer = (state, { type, payload }) => {
  switch (type) {
    case 'isShowPassword':
      return {
        ...state,
        passwordVisibility: {
          ...state.passwordVisibility,
          isShowPassword: !state.passwordVisibility.isShowPassword,
        },
      };
    case 'isShowNewPassword':
      return {
        ...state,
        passwordVisibility: {
          ...state.passwordVisibility,
          isShowNewPassword: !state.passwordVisibility.isShowNewPassword,
        },
      };
    case 'isShowConfirmPassword':
      return {
        ...state,
        passwordVisibility: {
          ...state.passwordVisibility,
          isShowConfirmPassword:
            !state.passwordVisibility.isShowConfirmPassword,
        },
      };
    case 'compairePasswords':
      if (state.password === state.confirmPassword) {
        return { ...state, isErrorConfirmPassword: false };
      } else {
        return { ...state, isErrorConfirmPassword: true };
      }
    case 'compaireEmails':
      if (state.email === state.confirmEmail) {
        return { ...state, isErrorConfirmEmail: false };
      } else {
        return { ...state, isErrorConfirmEmail: true };
      }
    default:
      return { ...state, [type]: payload };
  }
};
