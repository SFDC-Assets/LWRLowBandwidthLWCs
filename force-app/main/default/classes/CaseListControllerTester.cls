@isTest
public class CaseListControllerTester {

    @isTest static void testCaseComment() {
        Case c = new Case();
        c.Effective_Date__c = Date.Today();
        c.Request_Type__c = 'Transfers';
        c.Routed_PSD__c = 'AFLOAT EAST';
        insert c;

        List<Case> clist = CaseListController.getCases('Subject','asc');

    }

}

