export type GuardianInfoType = {
  _id: string;
  id: string;
  name: string;
  mobile: string;
  relationship: string;
  occupation: string;
  email: string;
  address: string;
};

export type StudentInfoType = {
  role: string;
  past: {
    status: boolean;
  };
  withdraw: boolean;
  _id: string;
  profileUrl: string;
  name: string;
  middleName: string;
  surname: string;
  gender: "Male" | "Female" | "Other";
  dateofBirth: string;
  email: string;
  nationality: string;
  religion: string;
  placeOfBirth: string;
  health: string;
  disease: string;
  allege: string;
  classID: string;
  divison: string;
  dormitoryID: string;
  section: string;
  status: string;
  campusID: string;
  scholarship: string;
  fees: string | number;
  lastSchool: {
    school: string;
    reason: string;
  };
  mobilenumber: string | number;
  telephone: string | number;
  postalAddress: string;
  physicalAddress: string;
  guadian: GuardianInfoType[];
  password: string;
  userID: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}