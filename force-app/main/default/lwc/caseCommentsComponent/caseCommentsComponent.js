import { LightningElement, api, wire } from 'lwc';
import getCaseComments from '@salesforce/apex/CaseCommentsController.getCaseComments';

export default class CaseCommentsComponent extends LightningElement {
    @api recordId;
    caseComments = [];
    error = undefined;


    @wire(getCaseComments, { recordId: '$recordId' })
    wiredCaseComments({ error, data}) {
        if (data) {
            this.caseComments = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.caseComments = undefined;
        }
    }

    get hasComments() {
        return (this.caseComments != null) ? true : false;
    }
}