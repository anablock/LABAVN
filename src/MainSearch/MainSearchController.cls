public without sharing class MainSearchController {
   
    @AuraEnabled
    public static List<Opportunity> searchForIds(String searchText, String category, String status, String type, 
                                            String department, String naics, String industry,
                                            Date postedFrom, Date postedTo, Date dueFrom, Date dueTo,
                                            String city, String state, String zip, String zipDistance, String certification)
    {        
        String query = 'SELECT Id, Name, BAVN_ID__c, CreatedDate, CloseDate, StageName FROM Opportunity WHERE Name LIKE \'%' + searchText + '%\' OR BAVN_ID__c = \'' + searchText + '\'';
        if(String.isNotBlank(category)) query += ' AND Category__c = :category ';
        if(String.isNotBlank(status)) query += ' AND Status__c = :status ';
        if(String.isNotBlank(type)) query += ' AND Type__c = :type ';
        if(String.isNotBlank(department)) query += ' AND Department__c = :department ';
        //if(String.isNotBlank(naics)) query += ' AND Category__c = ' + category + '' ;
        if(String.isNotBlank(industry)) query += ' AND Industry__c = :industry ';
        if(String.isNotBlank(city)) query += ' AND City__c = :city ';
        if(String.isNotBlank(state)) query += ' AND State__c = :state ';
        if(String.isNotBlank(zip)) query += ' AND Zip__c = :zip ';
        if(String.isNotBlank(zipDistance)) query += ' AND ZipDistance__c = :zipDistance ';
        //if(String.isNotBlank(certification)) query += ' AND Certification__c = ' + certification + '' ;
        if(postedFrom != null) query += ' AND CreatedDate >= ' + dateToString(postedFrom) + ' ' ;
        if(postedTo != null) query += ' AND CreatedDate <= ' + dateToString(postedTo) + ' ' ;
        if(dueFrom != null) query += ' AND CloseDate  >= ' + dateToString(dueFrom) + ' ' ;
        if(dueTo != null) query += ' AND CloseDate  <= ' + dateToString(dueTo) + ' ' ;
        
        system.debug('Query: ' + query);
        
        List<Opportunity> opportunityList = Database.query(query);                                       
                                                
        return opportunityList;
    }
    
    private static String dateToString(Date d) {
        DateTime dt = DateTime.newInstance(d.year(), d.month(), d.day());
        String dateString = dt.format('yyyy-MM-dd');
        return dateString;
    }
    
}
