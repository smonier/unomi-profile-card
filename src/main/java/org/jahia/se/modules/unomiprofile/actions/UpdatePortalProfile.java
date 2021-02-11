/*
 * ==========================================================================================
 * =                   JAHIA'S DUAL LICENSING - IMPORTANT INFORMATION                       =
 * ==========================================================================================
 *
 *                                 http://www.jahia.com
 *
 *     Copyright (C) 2002-2020 Jahia Solutions Group SA. All rights reserved.
 *
 *     THIS FILE IS AVAILABLE UNDER TWO DIFFERENT LICENSES:
 *     1/GPL OR 2/JSEL
 *
 *     1/ GPL
 *     ==================================================================================
 *
 *     IF YOU DECIDE TO CHOOSE THE GPL LICENSE, YOU MUST COMPLY WITH THE FOLLOWING TERMS:
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 *     2/ JSEL - Commercial and Supported Versions of the program
 *     ===================================================================================
 *
 *     IF YOU DECIDE TO CHOOSE THE JSEL LICENSE, YOU MUST COMPLY WITH THE FOLLOWING TERMS:
 *
 *     Alternatively, commercial and supported versions of the program - also known as
 *     Enterprise Distributions - must be used in accordance with the terms and conditions
 *     contained in a separate written agreement between you and Jahia Solutions Group SA.
 *
 *     If you are unsure which license is appropriate for your use,
 *     please contact the sales department at sales@jahia.com.
 */
package org.jahia.se.modules.unomiprofile.actions;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.fasterxml.jackson.module.jaxb.JaxbAnnotationIntrospector;
import com.ning.http.client.AsyncCompletionHandler;
import com.ning.http.client.AsyncHttpClient;
import com.ning.http.client.Response;
import org.apache.commons.lang.StringUtils;
import org.apache.unomi.api.*;
import org.jahia.api.Constants;
import org.jahia.bin.Action;
import org.jahia.bin.ActionResult;
import org.jahia.exceptions.JahiaRuntimeException;
import org.jahia.modules.jexperience.admin.ContextServerService;
import org.jahia.services.content.JCRCallback;
import org.jahia.services.content.JCRSessionWrapper;
import org.jahia.services.content.JCRTemplate;
import org.jahia.services.render.RenderContext;
import org.jahia.services.render.Resource;
import org.jahia.services.render.URLResolver;
import org.jahia.services.usermanager.JahiaUser;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.*;

/**
 * <h1>UpdateProfile</h1>
 * <p>
 * The UpdateProfile class implement an action that simply update the profile properties in Unomi
 * using an event of type "updateProperties". The value of this profile properties passed from AJAX
 * call with a POST method contains the json object
 * <p>
 * The updated profile properties:
 * - DMP Segment
 * - Universe
 *
 * @author MF-TEAM
 */
public class UpdatePortalProfile extends Action {
    private static Logger logger = LoggerFactory.getLogger(UpdatePortalProfile.class);
    private ContextServerService contextServerService;
    private JCRTemplate jcrTemplate;

    @Override
    public ActionResult doExecute(final HttpServletRequest req, final RenderContext renderContext,
                                  final Resource resource, JCRSessionWrapper session, Map<String, List<String>> parameters,
                                  URLResolver urlResolver) throws Exception {
        logger.info("**** Updating Profile ****");
        String dataObject = new BufferedReader(new InputStreamReader(req.getInputStream())).readLine();
        JSONObject jsonOject = new JSONObject(dataObject);
        logger.info("**** jSonObject **** "+jsonOject);
        final String profileId = jsonOject.optString("profileId");
        final String sessionId = jsonOject.optString("sessionId");
        final String propertyKey = jsonOject.optString("propertyKey");
        final JSONArray propertyValue = jsonOject.getJSONArray("propertyValue");
        final String dmpId = jsonOject.optString("dmpId");
        final String dmpValue = jsonOject.optString("dmpValue");
        logger.info("**** jSonArray **** "+propertyValue);

        final JahiaUser jahiaUser = renderContext.getUser();

        jcrTemplate.doExecuteWithSystemSessionAsUser(jahiaUser, Constants.LIVE_WORKSPACE, session.getLocale(), new JCRCallback() {
                    @Override
                    public Object doInJCR(JCRSessionWrapper session) throws RepositoryException {
                        String siteKey = renderContext.getSite().getSiteKey();

                        final AsyncHttpClient asyncHttpClient = contextServerService
                                .initAsyncHttpClient(siteKey);

                        AsyncHttpClient.BoundRequestBuilder requestBuilder = contextServerService
                                .initAsyncRequestBuilder(siteKey, asyncHttpClient, "/eventcollector?sessionId=" + sessionId,
                                                            false, true, true);

                        Item source = new CustomItem();
                        source.setScope(siteKey);
                        source.setItemId("wemProfile");
                        source.setItemType("wemProfile");

                        Event event = new Event("updateProperties",
                                null,
                                new Profile(profileId),
                                siteKey,
                                source,
                                null,
                                new Date());
                        logger.info("**** Updating Profile Key,Value **** "+propertyKey+" : "+propertyValue);

                        Map<String, Object> map = new HashMap<>();
                        if (StringUtils.isNotEmpty(propertyKey)) {
                            try {
                               //JSONArray array = new JSONArray(propertyValue);
                               // JSONArray array = jsonOject.getJSONArray("propertyValue");

                                String[] values = new String[propertyValue.length()];
                                for (int i = 0; i < propertyValue.length(); i++) {
                                   // values[i] = propertyValue.getJSONObject(i).optString("_id");
                                    values[i] = propertyValue.getString(i);
                                }

                                map.put("properties." + propertyKey, values);
                            } catch (JSONException e) {
                                logger.error("Error can't create the JSON array", e);
                            }
                        }
                        event.setProperty("update", map);
                        event.setProperty("targetId", profileId);
                        event.setProperty("targetType", Profile.ITEM_TYPE);

                        EventsCollectorRequest eventCollectorRequest = new EventsCollectorRequest();
                        eventCollectorRequest.setEvents(Arrays.asList(event));

                        ObjectMapper mapper = new ObjectMapper();
                        mapper.setAnnotationIntrospector(new JaxbAnnotationIntrospector(TypeFactory.defaultInstance()));

                        try {
                            String eventJson = mapper.writeValueAsString(eventCollectorRequest);

                            requestBuilder.setBody(eventJson);
                            requestBuilder.execute(new AsyncCompletionHandler<Response>() {
                                @Override
                                public Response onCompleted(Response response) {
                                    asyncHttpClient.closeAsynchronously();
                                    return response;
                                }
                            });
                        } catch (JsonProcessingException e) {
                            throw new JahiaRuntimeException(e);
                        }

                        session.save();
                        return null;
                    }
                });

        JSONObject jsonResult = new JSONObject();
        if (StringUtils.isNotEmpty(propertyKey)) {
            jsonResult.put("status", "profile-updated");
        }  else {
            jsonResult.put("status", "error");
        }

        return new ActionResult(HttpServletResponse.SC_OK, null, jsonResult);
    }

    public void setContextServerService(ContextServerService contextServerService) {
        this.contextServerService = contextServerService;
    }

    public void setJcrTemplate(JCRTemplate jcrTemplate) {
        this.jcrTemplate = jcrTemplate;
    }
}