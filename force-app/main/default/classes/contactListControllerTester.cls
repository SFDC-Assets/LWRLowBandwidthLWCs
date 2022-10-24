@isTest
public class contactListControllerTester {
    @isTest static void testContactList() {

        Contact c = new Contact();
        c.LastName = 'test';
        insert c;

        List<Contact> clist = ContactListController.getContacts('LastName','asc');


    }
}
