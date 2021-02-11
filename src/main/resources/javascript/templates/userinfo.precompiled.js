(function () {
    var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
    templates['userinfo'] = template({
        "1": function (container, depth0, helpers, partials, data) {
            var helper, lookupProperty = container.lookupProperty || function (parent, propertyName) {
                if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
                    return parent[propertyName];
                }
                return undefined
            };

            return "            <img src='"
                + container.escapeExpression(((helper = (helper = helpers.profilePictureUrl || (depth0 != null ? depth0.profilePictureUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"profilePictureUrl","hash":{},"data":data}) : helper)))
                + "' id=\"userPic\" class='profile-picture user-avatar img-fluid'/>\n";
        },"3":function(container,depth0,helpers,partials,data) {
            return "            <img src='/modules/jexperience/images/default-profile.jpg' id=\"userPic\"\n                 class='profile-picture user-avatar img-fluid'/>\n";
        },"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
            var stack1, helper;

            return "<div class=\"userGreeting\">\n    <span id=\"userGreeting\">Good afternoon, "
                + container.escapeExpression(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"firstName","hash":{},"data":data}) : helper)))
                + "</span>\n</div>\n<div class=\"userTable\">\n    <div class=\"userPicCol\">\n"
                + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.profilePictureUrl : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
                + "        <div style=\"font-size:14px\"><a data-toggle=\"modal\" data-target=\"#myModal\" href=\"\">Personalize</a></div>\n    </div>\n    <div class=\"userCol\">\n        <div class=\"profileTable\">\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"firstName\">"
                + container.escapeExpression(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"firstName","hash":{},"data":data}) : helper)))
                + "</span>&nbsp;<span id=\"lastName\">"
                + container.escapeExpression(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"lastName","hash":{},"data":data}) : helper)))
                + "</span>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"userCompany\">"
                + container.escapeExpression(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"company","hash":{},"data":data}) : helper)))
                + "</span>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"jobTitle\">"
                + container.escapeExpression(((helper = (helper = helpers.jobTitle || (depth0 != null ? depth0.jobTitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"jobTitle","hash":{},"data":data}) : helper)))
                + "</span>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <a id=\"userEmail\" href=\"mailto:"
                + container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)))
                + "\">"
                + container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)))
                + "</a>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"userSince\">Customer since "
                + container.escapeExpression((helpers.formatDate || (depth0 && depth0.formatDate) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.firstVisit : depth0),"short",{"name":"formatDate","hash":{},"data":data}))
                + "</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
        },"useData":true})
})();

