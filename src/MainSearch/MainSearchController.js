({
    doInit : function(component, event, helper) {
        var url = $A.get('$Resource.MainSearchBackground');
        component.set('v.backgroundImageURL', url);
    },
    
    navigateToSelfRegister: function(cmp, event, helper) {
        var selfRegUrl = cmp.get("v.communitySelfRegisterUrl");
        if (selfRegUrl == null) {
            selfRegUrl = cmp.get("v.selfRegisterUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(selfRegUrl.indexOf("?") === -1) {
                selfRegUrl = selfRegUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                selfRegUrl = selfRegUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: selfRegUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    
    navigateToLogin: function(cmp, event, helper) {
        var selfRegUrl = cmp.get("v.communityLoginUrl");
        if (selfRegUrl == null) {
            selfRegUrl = cmp.get("v.loginUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(selfRegUrl.indexOf("?") === -1) {
                selfRegUrl = selfRegUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                selfRegUrl = selfRegUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: selfRegUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    
    navigateToAdvancedSearch: function(cmp, event, helper) {
        var selfRegUrl = cmp.get("v.communityAdvancedSearchUrl");
        if (selfRegUrl == null) {
            selfRegUrl = cmp.get("v.advancedSearchUrl");
        }
        var startUrl = cmp.get("v.startUrl");
        if(startUrl){
            if(selfRegUrl.indexOf("?") === -1) {
                selfRegUrl = selfRegUrl + '?startURL=' + decodeURIComponent(startUrl);
            } else {
                selfRegUrl = selfRegUrl + '&startURL=' + decodeURIComponent(startUrl);
            }
        }
        var attributes = { url: selfRegUrl };
        $A.get("e.force:navigateToURL").setParams(attributes).fire();
    },
    
    handleSearch : function(component, event, helper) {
        var searchText = component.get('v.bavnIdOrDesc');
        var category = component.get('v.category');
        var status = component.get('v.status');
        var type = component.get('v.type');
        var action = component.get('c.searchForIds');
        action.setParams({"searchText": searchText,
                          "category" : category,
                          "status" : status,
                          "type" : type,
                         });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === 'SUCCESS') {
                var ids = response.getReturnValue();
                sessionStorage.setItem('customSearch--recordIds', JSON.stringify(ids));
                var navEvt = $A.get('e.force:navigateToURL');
                navEvt.setParams({url: '/custom-search-results'});
                navEvt.fire();
            }
        });
        
        var inputValue = component.find('searchInput').get('v.value');
        
        if(inputValue === "" || inputValue === undefined) {
            component.find('searchInput').showHelpMessageIfInvalid();
        } else {
            $A.enqueueAction(action);
        }
    }
    
})
