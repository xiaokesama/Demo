// 读取当前页面的所有配置
function getUrlUsrPwdArrayfromPage() {
  const UrlUsrPwdArray = []
  const inputboxs = document.querySelectorAll('.input-container');
  inputboxs.forEach((inputbox, index) => {
    const matchUrl = inputbox.querySelector('#matchUrl');
    const usernameSelector = inputbox.querySelector('#usernameSelector');
    const username = inputbox.querySelector('#username');
    const passwordSelector = inputbox.querySelector('#passwordSelector');
    const password = inputbox.querySelector('#password');
    const submitButtonSelector = inputbox.querySelector('#submitButtonSelector');
    const toggleSwitch = inputbox.querySelector('#toggleSwitch');
    const setting = {
      index: index,
      matchUrl: matchUrl.value,
      usernameSelector: usernameSelector.value,
      username: username.value,
      passwordSelector: passwordSelector.value,
      password: password.value,
      submitButtonSelector: submitButtonSelector.value,
      toggleSwitch: toggleSwitch.checked
    }
    UrlUsrPwdArray.push(setting)
  });
  return UrlUsrPwdArray
}
// 保存当前页面的所有配置到本地
function saveUrlUsrPwdArraytoStorage(UrlUsrPwdArray) {
  chrome.storage.local.set({
    UrlUsrPwdArray: UrlUsrPwdArray
  }, function() {
    console.log('Data saved');
  });
}

// 读取本地存储的所有配置
async function getUrlUsrPwdArrayfromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['UrlUsrPwdArray'], function(result) {
      const UrlUsrPwdArray = result.UrlUsrPwdArray || [];
      resolve(UrlUsrPwdArray);
    });
  });
}

// 清空所有配置
function clearUrlUsrPwdArraytoStorage() {
  chrome.storage.local.set({
    UrlUsrPwdArray: ""
  }, function() {
    console.log('Data cleared');
  });
}


// 页面加载时，读取本地存储的配置并显示到页面上
async function initUrlUsrPwdArray() {
  const UrlUsrPwdArray = await getUrlUsrPwdArrayfromStorage();
  const inputboxs = document.querySelectorAll('.input-container');
  if(!Array.isArray(UrlUsrPwdArray)){
    return;
  }
  console.log(UrlUsrPwdArray)
  UrlUsrPwdArray.forEach((setting, index) => {
    if(inputboxs[index] && inputboxs[index].querySelector('#matchUrl') && setting){
      inputboxs[index].querySelector('#matchUrl').value=setting.matchUrl;
      inputboxs[index].querySelector('#usernameSelector').value=setting.usernameSelector;
      inputboxs[index].querySelector('#username').value=setting.username;
      inputboxs[index].querySelector('#passwordSelector').value=setting.passwordSelector;
      inputboxs[index].querySelector('#password').value=setting.password;
      inputboxs[index].querySelector('#submitButtonSelector').value=setting.submitButtonSelector;
      inputboxs[index].querySelector('#toggleSwitch').checked=setting.toggleSwitch;
    }
  });
}

// 把login.asp放在第1个位置，作为默认配置
(async function(){
  const UrlUsrPwdArray = await getUrlUsrPwdArrayfromStorage()
  if(UrlUsrPwdArray[15] && UrlUsrPwdArray[15].matchUrl !== ""){
    return;
  }
  UrlUsrPwdArray[15] = {
    index: 15,
    matchUrl: "http://*/login.asp",
    usernameSelector: "#username",
    username: "admin",
    passwordSelector: "#password",
    password: "admin",
    submitButtonSelector: "#b_login",
    toggleSwitch: true
  }
  saveUrlUsrPwdArraytoStorage(UrlUsrPwdArray)
}());

// clearUrlUsrPwdArraytoStorage() 
// 初始化时加载已保存的配置
initUrlUsrPwdArray();


// 按钮绑定事件，存储配置
(function(){
  const setUrlUsrPwdButtons = document.querySelectorAll('#setUrlUsrPwd');
  setUrlUsrPwdButtons.forEach((button, index) => {
    button.addEventListener('click', async function() {
      const inputContainers = button.parentElement;
      const inputs = inputContainers.querySelectorAll('input');
      const matchUrl = inputs[0].value;
      const usernameSelector = inputs[1].value;
      const username = inputs[2].value;
      const passwordSelector = inputs[3].value;
      const password = inputs[4].value;
      const submitButtonSelector = inputs[5].value;
      const toggleSwitch = inputs[6].checked;

      // 读取Storage中的配置并更新
      const UrlUsrPwdArray = await getUrlUsrPwdArrayfromStorage()
      UrlUsrPwdArray[index] = {
        index: index,
        matchUrl: matchUrl,
        usernameSelector: usernameSelector,
        username: username,
        passwordSelector: passwordSelector,
        password: password,
        submitButtonSelector: submitButtonSelector,
        toggleSwitch: toggleSwitch
      }
      saveUrlUsrPwdArraytoStorage(UrlUsrPwdArray)
      // 刷新页面
      location.reload();
    });
  });
  const clearUrlUsrPwd = document.querySelectorAll('#clearUrlUsrPwd');
  clearUrlUsrPwd.forEach((button, index) => {
    button.addEventListener('click', async function() {
      // 读取Storage中的配置并更新
      const UrlUsrPwdArray = await getUrlUsrPwdArrayfromStorage()
      UrlUsrPwdArray[index] = {
        index: index,
        matchUrl: "",
        usernameSelector: "",
        username: "",
        passwordSelector: "",
        password: "",
        submitButtonSelector: "",
        toggleSwitch: false
      }
      saveUrlUsrPwdArraytoStorage(UrlUsrPwdArray)
      // 刷新页面
      location.reload();
    });
  });
})();



