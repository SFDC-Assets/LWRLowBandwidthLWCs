public with sharing class contactListController {
        @AuraEnabled(cacheable = true)

        public static List<Contact> getContacts(String sortBy, String sortDirection){
            String query = 'SELECT Id, Name, Account.Name, Title, Phone, Email, Owner.Name FROM Contact';
        if ( sortBy != null && sortDirection != null ) {
           query += ' ORDER BY ' + sortBy + ' ' + sortDirection;
        }
        return Database.query(query);
        }
}

