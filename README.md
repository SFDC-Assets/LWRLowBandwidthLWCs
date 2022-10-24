![BSD 3-Clause License](https://img.shields.io/badge/license-BSD%203--Clause-success)
![Status](https://img.shields.io/badge/status-Complete-green)
![Geography](https://img.shields.io/badge/Geography-US-blue)

<h1 align="center">Lightning Web Runtime LWC Bundle</h1>
<p align="center">This unlocked package contains 10 (yes 10!) various Lightning web components for Cases and Contacts, optimized to work on Salesforce Lightning Web Runtime (LWR) sites.  The purpose of these components was to demonstrate a lightweight experience for cases and contacts, optimized to run on super low bandwidth internet connections. </p>

<!-- Sections below are Optional -->

---

## Summary

This component was originally designed for a clothing supply program for a branch of the U.S Military.  The goal of this component was to render all of the warehouse locations that contained the requested order line items onto a dynamically created Salesforce Maps layer.  From the simple push of a button on the order form, users would be automatically redirected to a view of Salesforce Maps that displays all of the locations that contained the requested items on the order form.

![Map View](images/map_view.png)

The Apex mapping function is then embedded into a flow button that can be placed directly on the record page that you will call the action from, and then utilizes the <a href="https://unofficialsf.com/new-ways-to-open-web-pages-from-flow/">UnofficialSF OpenURL flow component</a> to open the layer in Salesforce Maps.

## Code Setup Instructions

Since this component relies heavily on the specific data model being used by the Salesforce org, some modification to the SOQL queries will be required in order to get this component working in your org.

First, ensure that the object you want to map (in this case inventory__c) is already defined in Salesforce Maps with a base object and both lat and long fields to store the geolocation.  This ensures that our inventory warehouse records can actually be read and mapped by the SF Maps application.

Next we want to determine what types of records we are looking for (line 21 of the apex class).  In this case, we queried each of the order line items off of the current sales order and stored them in a separate list.

```
List<PBSI__PBSI_Sales_Order_Line__c> salesorderlinelist = [SELECT Id, PBSI__Item__c,PBSI__Item__r.Name, PBSI__Quantity_Needed__c FROM PBSI__PBSI_Sales_Order_Line__c where PBSI__Sales_Order__c =: currentId];
```

Now that we have our line items, we can run another query to select all of the locations that have those items in stock (lines 25-30).  In our example, we iterate through all of the sales order lines, select the Inventory__c records where that item is in stock, and then add them to another list.

```
List<List<PBSI__PBSI_Inventory__c>> ilist = new List<List<PBSI__PBSI_Inventory__c>>();
            //iterate through salesorderlinelist
            for(PBSI__PBSI_Sales_Order_Line__c salesorderline:salesorderlinelist){
            	List<PBSI__PBSI_Inventory__c> myilist = [SELECT PBSI__qty__c, PBSI__location_lookup__c, PBSI__location_lookup__r.Name FROM PBSI__PBSI_Inventory__c WHERE PBSI__item_lookup__c =: salesorderline.PBSI__Item__c AND PBSI__qty__c > 0];
            	ilist.add(myilist);
            }
```

The rest of the code is essentially grabbing the base URL of the org, appending all of the records, and then defining other parameters like tooltips, the marker color, and the zoom level of the map when it loads (Line 54). Again, for more clarification on the syntax of building a Mapping URL, please see <a href="https://help.salesforce.com/s/articleView?id=000354507&type=1">this Salesforce Maps documentation</a>.

```
baseURL = baseURL+'&baseObjectId=a2E8Z0000077EolUAE&tooltipField=PBSI__location_lookup__r.Name&tooltipField2=PBSI__item_lookup__c&tooltipField3=PBSI__Description__c&tooltipField4=PBSI__qty__c&zoom=8&color='+color;
```

Now that our URL is built and returned at the end of the code, we can configure a basic flow to call our class and open the URL.

## Flow Setup

The flow used here is super basic and consists of only 3 basic steps: rendering a button, calling our apex class, and then opening the URL with the <a href="https://unofficialsf.com/new-ways-to-open-web-pages-from-flow/">UnofficialSF OpenURL action</a>.

![flow overview](images/flow_overview.png)

The only thing to note here is to ensure that you are passing the output parameters correctly to the openURL function like so:

![apex action](images/apex_action.png)

![open url](images/open_url.png)

## Deploy this package

<a href="https://githubsfdeploy.herokuapp.com?owner=SFDC-Assets&repo=DynamicSFMaps">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

## Maintainer

Jack Galletta, Public Sector Solution Engineer

Please feel free to Slack me with any questions about setup, configuration, or general improvements to the project.
