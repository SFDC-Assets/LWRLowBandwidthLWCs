@isTest
public class CaseCommentsControllerTester {

    @isTest static void testCaseComment() {
        Case c = new Case();
        c.Effective_Date__c = Date.Today();
        c.Request_Type__c = 'Transfers';
        c.Routed_PSD__c = 'AFLOAT EAST';
        insert c;
        
        CaseComment a = new CaseComment();
        a.ParentId = c.id;

        insert a;
        List<CaseComment> cclist = CaseCommentsController.getCaseComments(c.id);
        System.assertEquals(cclist[0].Id, a.Id);

    }

}
