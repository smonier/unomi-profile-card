(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['userinfo'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img src='"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"profilePictureUrl") || (depth0 != null ? lookupProperty(depth0,"profilePictureUrl") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"profilePictureUrl","hash":{},"data":data,"loc":{"start":{"line":7,"column":22},"end":{"line":7,"column":43}}}) : helper)))
    + "' id=\"userPic\" class='profile-picture user-avatar img-fluid'/>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "            <img src='/modules/jexperience/images/default-profile.jpg' id=\"userPic\"\n                 class='profile-picture user-avatar img-fluid'/>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"userGreeting\">\n    <span id=\"userGreeting\">Good afternoon, "
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":2,"column":44},"end":{"line":2,"column":57}}}) : helper)))
    + "</span>\n</div>\n<div class=\"userTable\">\n    <div class=\"userPicCol\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"profilePictureUrl") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":11,"column":15}}})) != null ? stack1 : "")
    + "        <div style=\"font-size:14px\"><a data-toggle=\"modal\" data-target=\"#myModal\" href=\"\">Personalize</a></div>\n    </div>\n    <div class=\"userCol\">\n        <div class=\"profileTable\">\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"firstName\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"firstName") || (depth0 != null ? lookupProperty(depth0,"firstName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data,"loc":{"start":{"line":18,"column":41},"end":{"line":18,"column":54}}}) : helper)))
    + "</span>&nbsp;<span id=\"lastName\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"lastName") || (depth0 != null ? lookupProperty(depth0,"lastName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data,"loc":{"start":{"line":18,"column":87},"end":{"line":18,"column":99}}}) : helper)))
    + "</span>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"userCompany\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"company") || (depth0 != null ? lookupProperty(depth0,"company") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"company","hash":{},"data":data,"loc":{"start":{"line":23,"column":43},"end":{"line":23,"column":54}}}) : helper)))
    + "</span>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"jobTitle\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"jobTitle") || (depth0 != null ? lookupProperty(depth0,"jobTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"jobTitle","hash":{},"data":data,"loc":{"start":{"line":28,"column":40},"end":{"line":28,"column":52}}}) : helper)))
    + "</span>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <a id=\"userEmail\" href=\"mailto:"
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":33,"column":51},"end":{"line":33,"column":60}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"email") || (depth0 != null ? lookupProperty(depth0,"email") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data,"loc":{"start":{"line":33,"column":62},"end":{"line":33,"column":71}}}) : helper)))
    + "</a>\n                </div>\n            </div>\n            <div class=\"profileRow\">\n                <div class=\"profileCol\">\n                    <span id=\"userSince\">Customer since<br/>"
    + alias4((lookupProperty(helpers,"formatDate")||(depth0 && lookupProperty(depth0,"formatDate"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"firstVisit") : depth0),"short",{"name":"formatDate","hash":{},"data":data,"loc":{"start":{"line":38,"column":60},"end":{"line":38,"column":93}}}))
    + "</span>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"useData":true});
})();