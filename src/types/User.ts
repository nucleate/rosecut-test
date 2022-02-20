export type User = {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: number;
    dateOfBirth: Date;
    email: string;
    gender?: string;
    addressLine1: string;
    addressLine2?: string;
    addressType?: string;
    city: string;
    state?: string;
    counry: string;
    postcode: string;
    maritalStatus?: string;
    nationality: string;
    nino?: string;
    utr?: string;
}