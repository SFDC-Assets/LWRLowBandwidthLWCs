import { LightningElement, wire, track, api } from 'lwc';
import { getListInfoByName} from 'lightning/uiListsApi';
import CASE_OBJECT from '@salesforce/schema/Case';
import getCases from '@salesforce/apex/CaseListController.getCases';
import { refreshApex } from '@salesforce/apex';



const actions = [
    { label: 'Navigate to Details', name: 'navigate_details' }
]
const COLUMNS = [
    {label: 'Case Number', sortable:"true", fieldName: 'CaseURL',type: 'url',typeAttributes: {label: { fieldName: 'CaseNumber' }, target: '_blank'}},
    {label: 'Subject', fieldName: 'Subject', sortable:"true"},
    {label: 'Request Type', fieldName: 'Request_Type__c', sortable:"true"},
    {label: 'Problem Code', fieldName: 'Problem_Code__c', sortable:"true"},
    {label: 'Routed PSD', fieldName: 'Routed_PSD__c', sortable:"true"},
    {label: 'Date/Time Opened', fieldName: 'CreatedDate', sortable:"true"},
    {label: 'Effective Date', fieldName: 'Effective_Date__c', sortable:"true"}
]
export default class CaseListViewComponent extends LightningElement {
    @api listviewapi;
    error;
    displayColumns;
    records;
    fields = [];
    @track myColumns;

    @track value;
    @track error;
    @track data;
    @api sortedDirection = 'asc';
    @api sortedBy = 'Subject';
    @api searchKey = '';
    result;
    @track allSelectedRows = [];
    @track page = 1; 
    @track items = []; 
    @track data = []; 
    @track columns; 
    @track startingRecord = 1;
    @track endingRecord = 0; 
    @track pageSize = 5; 
    @track totalRecountCount = 0;
    @track totalPage = 0;
    isPageChanged = false;
    initialLoad = true;
    mapoppNameVsOpp = new Map();;


    @wire(getListInfoByName, {objectApiName: CASE_OBJECT.objectApiName,listViewApiName: '$listviewapi'})
        listInfo({ error, data }) {
        if (data) {
            this.displayColumns = data.displayColumns;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.displayColumns = undefined;
        }

    }

    @wire(getCases,{sortBy: '$sortedBy', sortDirection: '$sortedDirection'})wiredCases({error, data}){
        if(data){
            let currentData = [];
            
            //this.myColumns = COLUMNS;
            data.forEach((row) => {

                let rowData = {};
                rowData.CaseURL='/case/'+row.Id;
                rowData.CaseNumber = row.CaseNumber;
                rowData.Subject = row.Subject;
                rowData.Request_Type__c = row.Request_Type__c;
                rowData.Problem_Code__c = row.Problem_Code__c;
                rowData.Routed_PSD__c = row.Routed_PSD__c;
                rowData.CreatedDate = row.CreatedDate;
                rowData.Effective_Date__c = row.Effective_Date__c;

                

                currentData.push(rowData);
                console.log(`${JSON.stringify(rowData)}`);
            });
            this.data = currentData;
            this.error = undefined;
            this.processRecords(data);
        }

        else if (error) {
            console.log(`error: ${JSON.stringify(error)}`);
            this.error = error;
            this.record = undefined;
        }
    }
        processRecords(data){
            this.items = this.data;
                this.totalRecountCount = data.length; 
                this.totalPage = Math.ceil(this.totalRecountCount / this.pageSize); 
                
                this.data = this.items.slice(0,this.pageSize); 
                this.endingRecord = this.pageSize;
                this.myColumns = COLUMNS;
        }
        //clicking on previous button this method will be called
        previousHandler() {
            this.isPageChanged = true;
            if (this.page > 1) {
                this.page = this.page - 1; //decrease page by 1
                this.displayRecordPerPage(this.page);
            }
              var selectedIds = [];
              for(var i=0; i<this.allSelectedRows.length;i++){
                selectedIds.push(this.allSelectedRows[i].Id);
              }
            this.template.querySelector(
                '[data-id="table"]'
              ).selectedRows = selectedIds;
        }
    
        //clicking on next button this method will be called
        nextHandler() {
            this.isPageChanged = true;
            if((this.page<this.totalPage) && this.page !== this.totalPage){
                this.page = this.page + 1; //increase page by 1
                this.displayRecordPerPage(this.page);            
            }
              var selectedIds = [];
              for(var i=0; i<this.allSelectedRows.length;i++){
                selectedIds.push(this.allSelectedRows[i].Id);
              }
            this.template.querySelector(
                '[data-id="table"]'
              ).selectedRows = selectedIds;
        }
    
        //this method displays records page by page
        displayRecordPerPage(page){
    
            this.startingRecord = ((page -1) * this.pageSize) ;
            this.endingRecord = (this.pageSize * page);
    
            this.endingRecord = (this.endingRecord > this.totalRecountCount) 
                                ? this.totalRecountCount : this.endingRecord; 
    
            this.data = this.items.slice(this.startingRecord, this.endingRecord);
            this.startingRecord = this.startingRecord + 1;
        }    
        
        sortColumns( event ) {
            if(event.detail.fieldName == 'CaseURL'){
            this.sortedBy = 'CaseNumber';
            }
            else{
                this.sortedBy = event.detail.fieldName;
            }
            this.sortedDirection = event.detail.sortDirection;
            return refreshApex(this.result);
            
        }
        
        onRowSelection(event){
            if(!this.isPageChanged || this.initialLoad){
                if(this.initialLoad) this.initialLoad = false;
                this.processSelectedRows(event.detail.selectedRows);
            }else{
                this.isPageChanged = false;
                this.initialLoad =true;
            }
            
        }
        processSelectedRows(selectedOpps){
            var newMap = new Map();
            for(var i=0; i<selectedOpps.length;i++){
                if(!this.allSelectedRows.includes(selectedOpps[i])){
                    this.allSelectedRows.push(selectedOpps[i]);
                }
                this.mapoppNameVsOpp.set(selectedOpps[i].Name, selectedOpps[i]);
                newMap.set(selectedOpps[i].Name, selectedOpps[i]);
            }
            for(let [key,value] of this.mapoppNameVsOpp.entries()){
                if(newMap.size<=0 || (!newMap.has(key) && this.initialLoad)){
                    const index = this.allSelectedRows.indexOf(value);
                    if (index > -1) {
                        this.allSelectedRows.splice(index, 1); 
                    }
                }
            }
        }
    

    

}