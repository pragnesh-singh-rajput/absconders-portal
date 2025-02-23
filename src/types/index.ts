export type Role = 'admin' | 'investigator' | 'public';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  district?: string;
  state?: string;
  policeStation?: string;
}

export interface Criminal {
  id: string;
  state: string;
  district: string;
  policeStation: string;
  firNumber: string;
  name: string;
  age: number;
  fatherName: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  idProof: {
    type: 'aadhar' | 'pan' | 'voter';
    number: string;
  };
  identifiableMarks: string[];
  warrants: {
    id: string;
    details: string;
    issuedDate: Date;
    isActive: boolean;
  }[];
  images: {
    url: string;
    type: 'profile' | 'identificationMark' | 'warrant';
  }[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  lastUpdatedBy: string;
}