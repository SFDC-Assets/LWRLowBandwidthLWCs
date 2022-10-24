@isTest
public class contactRelatedCasesControllerTester {
    @isTest static void testRelatedCases() {
        Contact c = new Contact();
        c.LastName = 'test';
        insert c;

        Case ca = new Case();
        ca.Effective_Date__c = Date.Today();
        ca.Request_Type__c = 'Transfers';
        ca.Routed_PSD__c = 'AFLOAT EAST';
        insert ca;

        contactRelatedCasesController.getCases(c.Id);
    }
}
