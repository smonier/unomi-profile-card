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
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<template:addResources type="javascript" resources="userdata.js"/>

<c:set var="title" value="${currentNode.properties['jcr:title'].string}"/>
<c:set var="profileProperties" value="${currentNode.properties['jExpProperty']}"/>

<h2>${title}</h2>

<div class="row">

</div>

<script type="text/javascript">
    $(function () {
        // Handlebars.registerHelper("formatDate", (dateAsString) => {
        //     var date = new Date(dateAsString);
        //     return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
        // });
        var propsArray = new Array();

        <c:forEach items="${profileProperties}" var="property" varStatus="status">
        c = new Object();
        c = '${property}';
        propsArray.push(c);
        </c:forEach>


        $(".profile-loaded-subscriber").bind("profileLoaded", (e, data) => {
            var target = $(".profile-loaded-subscriber > .profile-data");
            console.log(data);
            var list = "";
            $.each(data, recurse);

            function recurse(key, val) {
                // list += "<li>";
                if (val instanceof Object) {
                    //   list += key + "<ul>";
                    $.each(val, recurse);
                    //  list += "</ul>";
                } else {
                    if (contains(propsArray, key)) {
                        if (key === "profilePictureUrl") {
                            list += "<p><img src='" + val + "'/></p>";
                        } else {
                            list += "<span> <b>" + key + ":</b> " + val + "</span><br/>";
                        }
                    }
                }
                // list += "</li>";
            }

            // list += "</ul>";

            $(target).html(list);

        });
    });
</script>


<div class="ml-auto profile-loaded-subscriber">
    <div class="container profile-data"></div>

</div>