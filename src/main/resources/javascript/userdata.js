const USER_DATA_KEY = "wemUserData";

//this loads the profile from unomi
loadProfile = (completed) => {
    if (window.cxs === undefined) return;

    var url = window.digitalData.contextServerPublicUrl + '/context.json?sessionId=' + window.cxs.sessionId;
    var payload = {
        source: {
            itemId: window.digitalData.page.pageInfo.pageID,
            itemType: "page",
            scope: window.digitalData.scope
        },
        requiredProfileProperties: ["*"],
        requiredSessionProperties: ["*"],
        requireSegments: true
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': "application/json",
            'Content-Type': "text/plain;charset=UTF-8"
        },
        body: JSON.stringify(payload)
    })
        .then((response) => response.json())
        .then((data) => {
            if (completed)
                completed(data);

            //add the user data to window
            window[USER_DATA_KEY] = data;

            //notify any subscribers that the patient data has been loaded
            $(".profile-loaded-subscriber").trigger("profileLoaded", data);
        });
}

$(function () {
    var interval = setInterval(loadProfile, 500, (data) => {
        clearInterval(interval);
    });
});

function walk(obj,target) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            $("<p>").html(key + " : " +val).appendTo(target);
            if(typeof(val) === "object"){
                walk(val);
            }
        }
    }
}

function contains(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}

/**
 * This function update profile properties.
 *
 */
updateProfileProperties = function () {

    var propertyValue = $('#profilePrefsForm [type="checkbox"]:checked').map(function () {
        return this.value;
    }).get();
    var pathURL = document.getElementById("pathURL").value;
    var propertyKey = "portalInterests";
    console.info('[UNOMI-PROFILE-CARD] Call event update profile properties: '+pathURL+' - '+propertyValue);
    wem.ajax({
        url: encodeURI(pathURL + '.updatePortalProfile.do'),
        type: 'POST',
        dataType: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(
            {
                'profileId': cxs.profileId,
                'sessionId': wem.sessionID,
                'propertyKey': propertyValue ? propertyKey : '',
                'propertyValue': propertyValue ? propertyValue : ''
            }
        ),
        success: function (data) {
            var result = JSON.parse(data.response);

            if (result.status === 'profile-updated') {
                console.info('[UNOMI-PROFILE-CARD] Profile properties successfully updated');
                location.reload();

            }  else {
                console.error('[UNOMI-PROFILE-CARD] Could not update profile properties');
            }
        },
        error: function (err) {
            console.error('[UNOMI-PROFILE-CARD] Could not update profile properties', err);
        }
    });
}

