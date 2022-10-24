import { LightningElement, api } from 'lwc';

export default class ContactDetailComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
}