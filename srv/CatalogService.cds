using { anubhav.db.master, anubhav.db.transaction } from '../db/datamodel';
 //Odata service // CAP framework offers V4 odata service
service CatalogService @(path: 'CatalogService') {
 
   //Entityset - end point to perform all the CRUD operation on our data
   entity EmployeeSet as projection on master.employees;
   entity AddressSet as projection on master.address;
   entity ProductSet as projection on master.product;
   entity BusinessPartnerSet as projection on master.businesspartner;
   entity POs as projection on transaction.purchaseorder
    actions{
        action boost() returns POs;
    }
   ;
   entity POItems as projection on transaction.poitems;
   function getLargestOrder() returns POs;
}