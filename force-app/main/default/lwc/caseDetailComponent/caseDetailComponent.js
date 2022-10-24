import { LightningElement, api } from 'lwc';

export default class CaseDetailComponent extends LightningElement {
    @api recordId;
    @api objectApiName;
}