import { LightningElement, api, wire } from 'lwc';
import getCaseTeam from '@salesforce/apex/CaseTeamController.getCaseTeam';

export default class CaseTeamComponent extends LightningElement {
    @api recordId;
    caseTeam = [];

    @wire(getCaseTeam, { recordId: '$recordId' })
    wiredCaseTeam({ error, data }) {
        if (data) {
            let preparedTeamMembers = [];
            data.forEach(teamMember => {
                let preparedTeamMember = {};
                preparedTeamMember.id = teamMember.Id;
                preparedTeamMember.memberId = teamMember.MemberId;
                preparedTeamMember.memberName = teamMember.Member.Name;
                preparedTeamMember.teamRole = teamMember.TeamRole.Name;
                preparedTeamMember.accessLevel = teamMember.TeamRole.AccessLevel;
                preparedTeamMembers.push(preparedTeamMember);
            });

            this.caseTeam = preparedTeamMembers;
        } else if (error) {
            this.error = error;
            this.caseTeam = undefined;
            console.log("Didn't get caseTeam");
        }
    }

    get hasTeam() {
        return (this.caseTeam != null) ? true : false;
    }
}