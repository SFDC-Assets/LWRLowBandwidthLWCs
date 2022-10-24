import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import CASE_NUMBER from '@salesforce/schema/Case.CaseNumber';
import CASE_CONTACT from '@salesforce/schema/Case.ContactId';
import CONTACT_NAME from '@salesforce/schema/Contact.Name';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import CONTACT_MOBILE from '@salesforce/schema/Contact.MobilePhone';
import CONTACT_DODID from '@salesforce/schema/Contact.DODID__c';
import CONTACT_MAILING_ADDRESS from '@salesforce/schema/Contact.MailingAddress';
import CONTACT_RATE from '@salesforce/schema/Contact.Rate__c';
import CONTACT_PAYGRADE from '@salesforce/schema/Contact.Paygrade__c';
import CONTACT_SSN from '@salesforce/schema/Contact.SSN__c';
import CONTACT_UIC from '@salesforce/schema/Contact.UIC__c';
import CONTACT_ACTIVITY_NAME from '@salesforce/schema/Contact.Activity_Name__c';

const WIRE_FIELDS = [ CASE_NUMBER, CASE_CONTACT ];

export default class CaseContactViewComponent extends LightningElement {
    contactFields = [CONTACT_NAME, CONTACT_PHONE, CONTACT_DODID, CONTACT_MOBILE, CONTACT_MAILING_ADDRESS, CONTACT_EMAIL, CONTACT_RATE, CONTACT_SSN, CONTACT_PAYGRADE, CONTACT_UIC, CONTACT_ACTIVITY_NAME];

    @api recordId;
    @api objectApiName;
    contactId;
    error = null;
    showContact = true;

    @wire(getRecord, { recordId: '$recordId', fields: WIRE_FIELDS })
    case({ error, data }) {
        if (data) {
            this.contactId = data.fields.ContactId.value;
        } else if (error) {
            this.error = error;
            this.showContact = false;
        }
    }
}