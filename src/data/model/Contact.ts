export class Contact {
  contactId: string
  email: string
  isRegistered: boolean
  isVerified: boolean
  constructor(contactId: string, email: string, isRegistered: boolean, isVerified: boolean) {
    this.contactId = contactId;
    this.email = email;
    this.isRegistered = isRegistered;
    this.isVerified = isVerified;
  }
}
