import { Contact } from './Contact';

export class User {
  birthdate: string;
  contact: Contact;
  createdDate: string;
  gender: string;
  legalName: string;
  modifiedDate: string;
  nickname: string;
  userId: string;
  username: string;
  isNotified: boolean;
  constructor(
    birthdate: string,
    contact: Contact,
    createdDate: string,
    gender: string,
    legalName: string,
    modifiedDate: string,
    nickname: string,
    userId: string,
    username: string,
    isNotified: boolean,
  ) {
    this.birthdate = birthdate;
    this.contact = contact;
    this.createdDate = createdDate;
    this.gender = gender;
    this.legalName = legalName;
    this.modifiedDate = modifiedDate;
    this.nickname = nickname;
    this.userId = userId;
    this.username = username;
    this.isNotified = isNotified;
  }
}
