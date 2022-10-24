public with sharing class contactRelatedCasesController {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(Id recordId) {
        return [SELECT Id, CaseNumber, Subject FROM Case WHERE Contact.Id =: recordId];
    }
}
