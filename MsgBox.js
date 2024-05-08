function MsgBox(prompt, buttons, title, modes) {
  let MsgBoxContainer = document.createElement("div");
  MsgBoxContainer.className = "MsgBoxContainer";

  let TitleBox = document.createElement("div");
  TitleBox.className = "TitleBox";
  MsgBoxContainer.appendChild(TitleBox);

  let Icon = document.createElement("img");
  Icon.className = "Icon";

  let icon_size = "25x25";
  let info_color = "44ff44";
  let excl_color = "ff8822";
  let crit_color = "ff2222";
  let default_color = "124816";
  let icon_url = "https://singlecolorimage.com/get/";

  switch (modes) {
    case "info":
      Icon.src = `${icon_url}${info_color}/${icon_size}`;
      Icon.alt = "Info_icon";
      break;
    case "excl":
      Icon.src = `${icon_url}${excl_color}/${icon_size}`;
      Icon.alt = "Excl_icon";
      break;
    case "crit":
      Icon.src = `${icon_url}${crit_color}/${icon_size}`;
      Icon.alt = "Crit_icon";
      break;
    default:
      Icon.src = `${icon_url}${default_color}/${icon_size}`;
      Icon.alt = "Default_icon";
      break;
  }
  TitleBox.appendChild(Icon);

  let TitleText = document.createElement("p");
  TitleText.className = "TitleText";
  TitleText.textContent = title;
  TitleBox.appendChild(TitleText);

  let PromptText = document.createElement("p");
  PromptText.className = "PromptText";
  PromptText.textContent = prompt;
  MsgBoxContainer.appendChild(PromptText);

  let ButtonBox = document.createElement("div");
  ButtonBox.className = "ButtonBox";

  let buttonConfigs = {
    btnOkOnly: [{ text: "Ok", value: "btnOk" }],
    btnCancelOnly: [{ text: "Cancel", value: "btnCancel" }],
    btnOkCancel: [
      { text: "Ok", value: "btnOk" },
      { text: "Cancel", value: "btnCancel" },
    ],
    btnYesNo: [
      { text: "Yes", value: "btnYes" },
      { text: "No", value: "btnNo" },
    ],
    btnYesNoCancel: [
      { text: "Yes", value: "btnYes" },
      { text: "No", value: "btnNo" },
      { text: "Cancel", value: "btnCancel" },
    ],
    btnRetryCancel: [
      { text: "Retry", value: "btnRetry" },
      { text: "Cancel", value: "btnCancel" },
    ],
    btnIgnore: [{ text: "Ignore", value: "btnIgnore" }],
  };

  let buttonLabels = buttonConfigs[buttons];
  for (let i = 0; i < buttonLabels.length; i++) {
    let btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = buttonLabels[i].text;
    btn.onclick = function () {
      parent.document.body.removeChild(MsgBoxContainer);
      console.log(this.value);
      return this.value;
    };
    btn.value = buttonLabels[i].value;
    ButtonBox.appendChild(btn);
  }

  MsgBoxContainer.appendChild(ButtonBox);

  parent.document.body.appendChild(MsgBoxContainer);
}
