public with sharing class CaseListController {
        @AuraEnabled(cacheable = true)

        public static List<Case> getCases(String sortBy, String sortDirection){
            String query = 'SELECT Id, CaseNumber, Subject, Request_Type__c, Problem_Code__c, Routed_PSD__c, CreatedDate, Effective_Date__c FROM Case';
        if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        return Database.query(query);
        }
}
