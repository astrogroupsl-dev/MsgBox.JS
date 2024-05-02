async function loadStyleSheet(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to load stylesheet');
    }
    const style = document.createElement("style");
    style.textContent = await response.text();
    document.head.appendChild(style);
  } catch (error) {
    console.error("Failed to load style sheet:", error);
  }
}

async function MsgBox(prompt, buttons, title, modes) {
  // Load style sheet if needed
  const styleSheetUrl = "https://astrogroupsl-dev.github.io/MsgBox.JS/MsgBox.css";
  await loadStyleSheet(styleSheetUrl);

  let MsgBoxContainer = document.createElement("div");
  MsgBoxContainer.className = "MsgBoxContainer";
  MsgBoxContainer.style.position = "fixed";
  MsgBoxContainer.style.top = "50%";
  MsgBoxContainer.style.left = "50%";
  MsgBoxContainer.style.transform = "translate(-50%, -50%)";
  MsgBoxContainer.style.backgroundColor = "#fff";
  MsgBoxContainer.style.border = "1px solid #ccc";
  MsgBoxContainer.style.paddingTop = "0";
  MsgBoxContainer.style.paddingBottom = "5px";
  MsgBoxContainer.style.borderRadius = "5px";
  MsgBoxContainer.style.boxShadow = "0 0 40px 5px #000000";
  MsgBoxContainer.style.opacity = "0";
  MsgBoxContainer.style.animation = "fadeIn 0.25s ease forwards";

  let TitleBox = document.createElement("div");
  TitleBox.className = "TitleBox";
  TitleBox.style.display = "flex";
  TitleBox.style.alignItems = "center";
  TitleBox.style.justifyContent = "space-between";
  TitleBox.style.padding = "10px";
  TitleBox.style.backgroundColor = "#f5f5f5";
  TitleBox.style.borderBottom = "1px solid #ccc";
  MsgBoxContainer.appendChild(TitleBox);

  let Icon = document.createElement("img");
  Icon.className = "Icon";
  Icon.style.borderRadius = "50%";
  Icon.style.width = "25px";
  Icon.style.height = "25px";

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
  TitleText.style.flexGrow = "1";
  TitleText.style.marginLeft = "10px";
  TitleText.style.color = "#333";
  TitleText.style.fontSize = "18px";
  TitleText.style.fontWeight = "bold";
  TitleText.textContent = title;
  TitleBox.appendChild(TitleText);

  let PromptText = document.createElement("p");
  PromptText.className = "PromptText";
  PromptText.style.padding = "20px";
  PromptText.style.color = "#333";
  PromptText.style.fontSize = "16px";
  PromptText.style.lineHeight = "1.5";
  PromptText.textContent = prompt;
  MsgBoxContainer.appendChild(PromptText);

  let ButtonBox = document.createElement("div");
  ButtonBox.className = "ButtonBox";
  ButtonBox.style.display = "flex";
  ButtonBox.style.justifyContent = "flex-end";
  ButtonBox.style.padding = "10px";
  ButtonBox.style.backgroundColor = "#f5f5f5";
  ButtonBox.style.borderTop = "1px solid #ccc";

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
    btn.style.backgroundColor = "#db3434";
    btn.style.color = "#ffffff";
    btn.style.border = "none";
    btn.style.padding = "10px 20px";
    btn.style.textAlign = "center";
    btn.style.textDecoration = "none";
    btn.style.display = "inline-block";
    btn.style.fontSize = "16px";
    btn.style.margin = "4px 2px";
    btn.style.cursor = "pointer";
    btn.style.borderRadius = "5px";
    btn.style.transition = "background-color 0.3s ease";
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
