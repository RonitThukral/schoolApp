export type UserDetailsType = {
  profileUrl: string,
  // Personal Details
  title: string,
  name: string,
  middleName: string,
  surname: string,
  nationality: string,    // From Category
  religion: string, // from Caste
  email: string,
  dateofBirth: string,
  gender: string,

  // Employment Details
  position: string, // Staff Role
  department: string, // From /departments api call
  campusID: string, // From /campuses api call
  employmentDate: string,
  bank: string,
  accountNumber: string,
  qualifications: string,
  salary: string,
  allowance: string,
  years: string,    // Years of Past/School Experience

  // Contact Details
  telephone: string,  // SMS number
  mobilenumber: string,
  physicalAddress: string, // Area of Residence
  postalAddress: string,

  // Next of Kin Information
  nextofKin: {
    name: string,
    lastname: string,
    mobile: string,
    email: string,
    relationship: string,
    occupation: string,
    address: string,
  }

  // Extras
  health: string,
  disease: string,
  allege: string,
  ssnit: boolean,
  taxNumber: string,
  placeofBirth: string,
}

export const getUserPostBody = (userdetails: UserDetailsType) => {
  const userdata: UserDetailsType = {
    profileUrl: userdetails.profileUrl ?? "",
    title: userdetails.title ?? "",
    name: userdetails.name ?? "",
    middleName: userdetails.middleName ?? "",
    surname: userdetails.surname ?? "",
    email: userdetails.email ?? "",
    dateofBirth: userdetails.dateofBirth ?? "",
    gender: userdetails.gender ?? "",
    position: userdetails.position ?? "",
    department: userdetails.department ?? "",
    campusID: userdetails.campusID ?? "",
    employmentDate: userdetails.employmentDate ?? "",
    bank: userdetails.bank ?? "",
    accountNumber: userdetails.accountNumber ?? "",
    qualifications: userdetails.qualifications ?? "",
    salary: userdetails.salary ?? "",
    allowance: userdetails.allowance ?? "",
    years: userdetails.years ?? "",
    telephone: userdetails.telephone ?? "",
    mobilenumber: userdetails.mobilenumber ?? "",
    physicalAddress: userdetails.physicalAddress ?? "",
    postalAddress: userdetails.postalAddress ?? "",
    nextofKin: {
      name: userdetails.nextofKin.name ?? "",
      lastname: userdetails.nextofKin.lastname ?? "",
      mobile: userdetails.nextofKin.mobile ?? "",
      email: userdetails.nextofKin.email ?? "",
      relationship: userdetails.nextofKin.relationship ?? "",
      occupation: userdetails.nextofKin.occupation ?? "",
      address: userdetails.nextofKin.address ?? "",
    },
    health: '',
    disease: '',
    allege: '',
    ssnit: false,
    taxNumber: '',
    nationality: userdetails.nationality ?? "",
    religion: userdetails.religion ?? "",
    placeofBirth: '',
  }

  return userdata;
}