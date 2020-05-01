({
    doInit : function(component, event, helper) {
        
      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches
        
        $("#next1").click(function(){
            $("#checkTaxOK").css("display","none");
            $("#checkCodeOK").css("display","none");
            
            current_fs = $(this).closest('fieldset');
            next_fs = $(this).closest('fieldset').next();
            
            var allValid = component.find('newCompanyFormStep1').reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && !inputCmp.get('v.validity').valueMissing;
            }, true);
            
            if (allValid) {
                //activate next step on progressbar using the index of next_fs
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
                
                //show the next fieldset
                next_fs.show(); 
                //hide the current fieldset with style
                current_fs.hide();
                window.scrollTo(0, 0);
            }
            
            
        });
        
        $("#next2").click(function(){
            $("#checkTaxOK").css("display","none");
            $("#checkCodeOK").css("display","none");
            
            current_fs = $(this).closest('fieldset');
            next_fs = $(this).closest('fieldset').next();
            
            var filledValue = component.find('newCompanyFormStep2').get('v.value');
            
            if (filledValue === "" || filledValue === undefined) {
                component.find('newCompanyFormStep2').showHelpMessageIfInvalid();
            } else {
                //activate next step on progressbar using the index of next_fs
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
                
                //show the next fieldset
                next_fs.show(); 
                //hide the current fieldset with style
                current_fs.hide();
                window.scrollTo(0, 0);
            }
            
            
        });
        
        $("#next3").click(function(){
            $("#checkTaxOK").css("display","none");
            $("#checkCodeOK").css("display","none");
            
            current_fs = $(this).closest('fieldset');
            next_fs = $(this).closest('fieldset').next();
            
            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            
            //show the next fieldset
            next_fs.show(); 
            //hide the current fieldset with style
            current_fs.hide();
            window.scrollTo(0, 0);
        });
        
        $("#next4").click(function(){
            $("#checkTaxOK").css("display","none");
            $("#checkCodeOK").css("display","none");
            
            current_fs = $(this).closest('fieldset');
            next_fs = $(this).closest('fieldset').next();
            
            var allValid = component.find('newCompanyFormStep4').reduce(function (validSoFar, inputCmp) {
                inputCmp.showHelpMessageIfInvalid();
                return validSoFar && !inputCmp.get('v.validity').valueMissing;
            }, true);
            
            if (allValid) {
                //activate next step on progressbar using the index of next_fs
                $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
                $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
                
                //show the next fieldset
                next_fs.show(); 
                //hide the current fieldset with style
                current_fs.hide();
                window.scrollTo(0, 0);
            }
            
            
        });
        
        $(".previous").click(function(){
            current_fs = $(this).closest('fieldset');
            previous_fs = $(this).closest('fieldset').prev();
            
            //de-activate current step on progressbar
            $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
            $("#progressbar li").eq($("fieldset").index(previous_fs)).addClass("active");
            
            //show the previous fieldset
            previous_fs.show(); 
            //hide the current fieldset with style
            current_fs.hide();
            window.scrollTo(0, 0);
        });
        
        $(".submit").click(function(){
            return false;
        })
        
        $(".slds-notify__close").click(function(){
            $(this).parent().hide();
        })
 	},
    
    createRegistration : function(component, event, helper) {
        var action = component.get("c.createExternalAccountContactAndUser");

        action.setParams(
            { 
                "companyName": component.get("v.companyname"),
                "address1": component.get("v.addressone"),
                "address2": component.get("v.addresstwo"),
                "city": component.get("v.city"),
                "state": component.get("v.state"),
                "zip": component.get("v.zip"),
                "country": component.get("v.country"),
                "phone": component.get("v.phone"),
                "description": component.get("v.description"),
                "contractor": component.get("v.contractor"),
                "nonProfit": component.get("v.nonprofit"),
                "soleProprietor": component.get("v.soleproprietor"),
                "btrcNumber": component.get("v.btrcNumber"),
                "taxId": component.get("v.taxid"),
                "naicsCode": component.get("v.naicsCode"),
                "certNumber": component.get("v.certNumber"),
                "userFirstName": component.get("v.userFirstName"),
                "userLastName": component.get("v.userLastName"),
                "userEmail": component.get("v.userEmail"),
                "userTitle": component.get("v.userTitle"),
            });

        action.setCallback(this, function(res) {
            if (res.getState() === "SUCCESS") {
                //cmp.set("v.op_url", res.getReturnValue());
                var urlEvent = $A.get("e.force:navigateToURL");
                urlEvent.setParams({
                    'url': 'https://poconcept-labavn.cs35.force.com/LABAVNPartial/s/confirmed-registration'
                });
                urlEvent.fire();
            } 
        });
        $A.enqueueAction(action);
    },
    
    checkCert : function(component, event, helper) {
        $("#checkTaxOK").css("display","none");
        $("#checkTaxInvalid").css("display","none");
        var action = component.get("c.checkCertification");

        action.setParams(
            { 
                "certNumber": component.get("v.certNumber")
            });

        action.setCallback(this, function(res) {
            if (res.getReturnValue() === "VALID") {
            	$('#checkCertValid').css('display', 'inline-flex');
                $('.buttonNext1').prop("disabled", false);
            } else {
                $('#checkCertInvalid').css('display', 'inline-flex');
            }
        });
        $A.enqueueAction(action);
	},
    
    checkTax : function(component, event, helper) {
        $("#checkTaxOK").css("display","none");
        $("#checkTaxInvalid").css("display","none");
        var action = component.get("c.checkTaxId");

        action.setParams(
            { 
                "taxId": component.get("v.taxid")
            });

        action.setCallback(this, function(res) {
            if (res.getReturnValue() === "SUCCESS") {
            	$('#checkTaxOK').css('display', 'inline-flex');
                $('.buttonNext1').prop("disabled", false);
            } else {
                $('#checkTaxInvalid').css('display', 'inline-flex');
            }
        });
        $A.enqueueAction(action);
	},
    
    checkEmail : function(component, event, helper) {
        var email1 = component.find('userEmail');
        var email1Val = email1.get('v.value');
        var email2 = component.find('userEmailConfirm');
        var email2Val = email2.get('v.value');
        if(email1Val !== email2Val) {
            email2.setCustomValidity('Emails do not match.');
            email2.reportValidity();
            $('.buttonNext4').prop("disabled", true);
        } else {
            email2.setCustomValidity('');
            $('.buttonNext4').prop("disabled", false);
        }
    }
})
