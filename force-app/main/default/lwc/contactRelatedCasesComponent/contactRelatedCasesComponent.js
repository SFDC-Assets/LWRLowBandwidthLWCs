import { api, LightningElement, wire } from 'lwc';
import getCases from '@salesforce/apex/contactRelatedCasesController.getCases';

const COLUMNS = [
    {label: 'Case Number',  fieldName: 'CaseURL',type: 'url',typeAttributes: {label: { fieldName: 'CaseNumber' }, target: '_blank'}},
    {label: 'Subject', fieldName: 'Subject'}
]



export default class ContactRelatedCasesComponent extends LightningElement {

    @api recordId;
    data;
    error;
    myColumns;
    @wire(getCases,{recordId:'$recordId'})wiredCases({error, data}){
        if(data){
            let currentData = [];
            
            this.myColumns = COLUMNS;
            data.forEach((row) => {

                let rowData = {};
                rowData.CaseURL='https://gctestorg.my.site.com/ultralow/s/case/'+row.Id;
                rowData.CaseNumber = row.CaseNumber;
                rowData.Subject = row.Subject;

                currentData.push(rowData);
                console.log(`${JSON.stringify(rowData)}`);
            });
            this.data = currentData;
            this.error = undefined;
        }

        else if (error) {
            console.log(`error: ${JSON.stringify(error)}`);
            this.error = error;
            this.record = undefined;
        }
    }
}