import { IUser } from "../types/user"

export const validateUser = (user: IUser) => {
    if (!validateEmail(user.email)) {
        return "Invalid email address format"
    }

    if (!validatPostalCode(user.postcode)) {
        return "Invalid postcode format";
    }
    if (!validateNINO(user.nino)) {
        return "Invalid National Insurance Number format";
    }

    return "OK";
}

const validateEmail = (email: string) => {
    const validationPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return validateRegex(email, validationPattern);
}

const validatPostalCode = (postalCode: string) => {
    const validationPattern = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/;
    return validateRegex(postalCode, validationPattern);
}

const validateNINO = (nino?: string) => {
    if (!nino) return true;
    const validationPattern = /[A-Z]{2}\d{6}[A-Z]{1}/;
    return validateRegex(nino, validationPattern);
}

const validateRegex = (value: string, pattern: RegExp) => (value.match(pattern))

