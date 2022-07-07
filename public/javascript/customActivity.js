var campaignId = document.getElementById("camp-id");
var campaignName = document.getElementById("camp-name");
var communicationType = document.getElementById("comm-type");

function keyUpEvent(e) {
  let siblingInput,
    selectCommunicationTypeValue,
    inputCampaignNameValue,
    inputCampaignIdValue;
  //TODO : const targetId=e.target.id;
  const value =
    e.target.id != "comm-type"
      ? e.target.value
      : e.target.options[e.target.selectedIndex].value;
  if (e.target.id != "comm-type") {
    selectCommunicationTypeValue =
      communicationType.options[communicationType.selectedIndex].value;
    siblingInput = e.target.id = "camp-id"
      ? campaignName.value
      : campaignId.value;
  } else {
    inputCampaignNameValue = campaignName.value;
    inputCampaignIdValue = campaignId.value;
  }
  const isActive =
    e.target.id != "comm-type"
      ? value != "" && siblingInput != "" && selectCommunicationTypeValue != ""
      : value != "" &&
        inputCampaignNameValue != "" &&
        inputCampaignIdValue != "";

  buttonSettings = {
    button: "next",
    text: "done",
    visible: isActive,
    enabled: isActive,
  };

  connection.trigger("updateButton", buttonSettings);
}
//values

// Function for fetch requests
const makeRequest = async (endpoint, pyld = {}, qrprms = "") => {
  let body;

  try {
    const access_token = document.querySelector("#access_token").value;

    const response = await fetch(`/client-requests/${endpoint}${qrprms}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token, ...pyld }),
    });

    body = await response.json();
  } catch (err) {
    console.error(err);
  }

  return body;
};

/*
  buttonSettings = {
    button: 'next',
    text: 'done',
    visible: getFormValues().isValid,
      enabled: getFormValues().isValid,
    };
    
    connection.trigger('updateButton', buttonSettings);
*/

// This logic runs while UI is open
$(window).ready(() => {
  connection.trigger("ready");
});

// This logic runs when user opens the UI
connection.on("initActivity", async (data) => {
  console.log(campaignId.value);
  var button = document.getElementById("save");
  button.addEventListener("click", function () {
    console.log(campaignId.value);
    // INIT
    var valid = true,
      error = "",
      field = "";

    // ID
    field = document.getElementById("camp-id");
    error = document.getElementById("e-camp-id");
    if (!field.checkValidity()) {
      valid = false;
      error.innerHTML = "Required field\r\n";
    } else {
      error.innerHTML = "";
    }

    // NAME
    field = document.getElementById("camp-name");
    error = document.getElementById("e-camp-name");
    if (!field.checkValidity()) {
      valid = false;
      error.innerHTML = "Required field\r\n";
    } else {
      error.innerHTML = "";
    }

    // COMM-TYPE
    field = document.getElementById("comm-type");
    error = document.getElementById("e-comm-type");
    if (!field.checkValidity()) {
      valid = false;
      error.innerHTML = "Required field\r\n";
    } else {
      error.innerHTML = "";
    }

    // (C4) RESULT
    return valid;
  });
  // campaignId.addEventListener("keyup",function(e){

  //     buttonSettings = {
  //       button: 'next',
  //       text: 'done',
  //       visible: e.target.value!="",
  //       enabled: e.target.value!=""
  //     };

  //   connection.trigger('updateButton', buttonSettings);

  // })
  const fields = [
    {
      event: "keyup",
      element: campaignId,
    },
    {
      event: "keyup",
      element: campaignName,
    },
    {
      event: "change",
      element: communicationType,
    },
  ];
  fields.forEach((item) => {
    item.element.addEventListener(item.event, keyUpEvent);
  });

  payload = data ? data : {};

  // Iterate over the inArguments and display them on UI
  const hasInArguments = Boolean(
    payload.arguments &&
      payload.arguments.execute &&
      payload.arguments.execute.inArguments &&
      payload.arguments.execute.inArguments.length > 0
  );

  const inArguments = hasInArguments
    ? payload.arguments.execute.inArguments
    : {};
  if (hasInArguments) {
    campaignName.value = inArguments[0].inputCampaignNameValue;
    campaignId.value = inArguments[0].inputCampaignIdValue;
    communicationType.options[0].textContent =
      inArguments[0].selectCommunicationTypeValue;
    communicationType.options[0].value =
      inArguments[0].selectCommunicationTypeValue;
  }
});

// This logic runs when user clicks the Done button
connection.on("clickedNext", () => {
  if (true /* form ready to push*/) {
    const inputCampaignNameValue = campaignName.value;
    const inputCampaignIdValue = campaignId.value;
    const selectCommunicationTypeValue =
      communicationType.options[communicationType.selectedIndex].value;

    payload.metaData.isConfigured = true;
    payload.arguments.execute.inArguments = [
      {
        inputCampaignIdValue: inputCampaignIdValue,
        inputCampaignNameValue: inputCampaignNameValue,
        selectCommunicationTypeValue: selectCommunicationTypeValue,
      },
    ];

    //fill object|array then update
    connection.trigger("updateActivity", payload);
  }
});
