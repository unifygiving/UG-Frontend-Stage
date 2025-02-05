import * as Yup from 'yup';
import i18n from "../../../../i18n";

const t = i18n.getFixedT(null, "changePasswordPage");

export const changePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required(t("passwordRequired"))
        .min(8, t("passwordMinNotMet"))
        .max(30, t("passwordMaxReached")),
    newPassword: Yup.string()
        .required(t("newPasswordRequired"))
        .min(
            8,
            t("newPasswordMinNotMet")
        )
        .max(30, t("newPasswordMaxReached")),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], t("newPasswordNotMatch")),
});
