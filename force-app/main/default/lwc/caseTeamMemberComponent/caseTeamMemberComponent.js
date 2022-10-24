import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CaseTeamMemberComponent extends LightningElement {
    @api teammember;

    navigateToItem(event) {
        event.preventDefault();
        const userId = this.teammember.memberId;

        this[NavigationMixin.Navigate]({
            type: 'standard__recordpage',
            attributes: {
                recordId: userId,
                objectApiName: 'User',
                actionName: 'view'
            }
        });
    }
}