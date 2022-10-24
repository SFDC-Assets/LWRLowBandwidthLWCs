@isTest
public class CaseTeamControllerTester {

    @isTest static void testCaseTeam() {
        /*User u = new User();
        u.FirstName = 'Test';
        u.LastName = 'Test';
        u.Username = 'Testy';
        u.Email = 'Testy@test.com';
        u.alias = 'testy';
        u.Timezone
        insert u;*/

        Case c = new Case();
        c.Effective_Date__c = Date.Today();
        c.Request_Type__c = 'Transfers';
        c.Routed_PSD__c = 'AFLOAT EAST';
        insert c;

        CaseTeamMember ctm = new CaseTeamMember();
        ctm.ParentId = c.Id;

        CaseTeamController.getCaseTeam(c.Id);
        



    }

}
