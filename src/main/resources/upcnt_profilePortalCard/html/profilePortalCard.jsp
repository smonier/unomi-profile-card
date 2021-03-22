<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="ui" uri="http://www.jahia.org/tags/uiComponentsLib" %>
<%@ taglib prefix="functions" uri="http://www.jahia.org/tags/functions" %>
<%@ taglib prefix="query" uri="http://www.jahia.org/tags/queryLib" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="s" uri="http://www.jahia.org/tags/search" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<template:addResources type="javascript" resources="moment.js"/>

<template:addResources type="javascript" resources="vendor/handlebars.runtime.min.js"/>
<template:addResources type="javascript" resources="templates/userinfo.precompiled.js"/>
<template:addResources type="javascript" resources="userdata.js"/>
<template:addResources type="css" resources="userdata.css"/>
<c:set var="siteKey" value="${renderContext.site.siteKey}"/>
<c:set var="nodeUUID" value="${fn:replace(currentNode.identifier,'-','')}"/>

<jcr:nodeProperty node="${currentNode}" name="j:defaultCategory" var="categories"/>
<c:if test="${renderContext.loggedIn}">
    <jcr:node path="${currentUser.localPath}/profilePrefs" var="userPrefloc"/>

    <c:forEach items="${listUserPrefs.nodes}" var="prefs" varStatus="status">
        <c:set var="prefList" value="${prefList},${prefs.name}"/>
    </c:forEach>


    <script type="text/javascript">
        let portalPrefs${nodeUUID} = [];
        $(function () {
            var DateFormats = {
                short: "MMMM DD - YYYY",
                long: "dddd DD.MM.YYYY HH:mm"
            };
            // Deprecated since version 0.8.0
            Handlebars.registerHelper("formatDate", function (datetime, format) {

                if (moment) {
                    // can use other formats like 'lll' too
                    format = DateFormats[format] || format;
                    return moment(datetime).format(format);
                } else {
                    return datetime;
                }
            });

            $(".profile-loaded-subscriber").bind("profileLoaded", (e, data) => {
                portalPrefs${nodeUUID} = data.profileProperties.leadPreferences;
                var target = $(".profile-loaded-subscriber > .profile-data");
                var template = Handlebars.templates.userinfo;
                target.html(template(data.profileProperties));

                if (portalPrefs${nodeUUID} != null) {
                    portalPrefs${nodeUUID}.forEach(setChecked);

                    function setChecked(item, index) {
                        document.getElementById(item).checked = true;
                    }
                }
            });
        });
    </script>
    <div class="module_header">
        <div class="module_title">${currentNode.properties['jcr:title'].string}</div>
        <div class="module_divider">
        </div>
    </div>
    <div class="module_body">
        <div class="ml-auto profile-loaded-subscriber">
            <div class="container profile-data">
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Select your preferences</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onsubmit="return false;" method="post" id="${siteKey}-profilePrefsForm" name="${siteKey}-profilePrefsForm">
                    <input id="pathURL"
                           value="<c:url value='${url.base}${currentNode.path}'/>" type="hidden"/>
                    <input name="jcrRedirectTo"
                           value="<c:url value='${url.base}${renderContext.mainResource.node.path}'/>" type="hidden"/>
                    <div class="modal-body">
                        <c:forEach items="${categories}" var="category">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="${category.node.name}"
                                       id="${category.node.name}" name="categoryPref"/>
                                <label class="form-check-label" for="${category.node.name}">
                                        ${category.node.displayableName}
                                </label>
                            </div>
                        </c:forEach>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button onclick="javascript:updateProfileProperties('${siteKey}');" type="submit" class="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</c:if>