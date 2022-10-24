public with sharing class CaseTeamController {
    @AuraEnabled(cacheable=true)
    public static List<CaseTeamMember> getCaseTeam(Id recordId) {
        List<CaseTeamMember> caseTeam = new List<CaseTeamMember>();

        caseTeam = [SELECT Id, MemberId, Member.Name, TeamRole.Name, TeamRole.AccessLevel FROM CaseTeamMember WHERE ParentId = :recordId];


        return caseTeam;
    }
}
