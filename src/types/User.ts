export interface IUser {
    id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    phone: number;
    dateOfBirth: Date;
    email: string;
    gender?: UserGender;
    addressLine1: string;
    addressLine2?: string;
    addressType?: string;
    city: string;
    state?: string;
    country: string;
    postcode: string;
    maritalStatus?: UserMaritalStatus;
    nationality: string;
    nino?: string;
    utr?: string;
}