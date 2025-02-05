const SUFFIX = "https://unifygiving.com/pay/#/";
const paymentQrRegex = /^https:\/\/unifygiving.com\/pay\/#\/([\da-f\-]+)?/;

export const encodePaymentQRCode = (user) => {
    return SUFFIX + user.qrcode;
}

export const decodePaymentQRCode = (qrcode) => {
    const match = qrcode?.match(paymentQrRegex);
    if (!match || match.length < 2) {
        throw new Error("Not Beneficiary QR Code");
    }
    return match[1];
}