// 读取当前页面的所有配置
function getUrlUsrPwdArrayfromPage() {
  const UrlUsrPwdArray = []
  const inputboxs = document.querySelectorAll('.input-container');
  inputboxs.forEach((inputbox, index) => {
    const matchUrl = inputbox.querySelector('#matchUrl');
    const usernameSelector = inputbox.querySelector('#usernameSelector');
    const passwordSelector = inputbox.querySelector('#passwordSelector');
    const setting = {
      index: index,
      matchUrl: matchUrl.value,
      usernameSelector: usernameSelector.value,
      passwordSelector: passwordSelector.value
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
    if(inputboxs[index].querySelector('#matchUrl') && setting){
      inputboxs[index].querySelector('#matchUrl').value=setting.matchUrl;
      inputboxs[index].querySelector('#usernameSelector').value=setting.usernameSelector;
      inputboxs[index].querySelector('#passwordSelector').value=setting.passwordSelector;
    }
  });
}

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
      const passwordSelector = inputs[2].value;

      // 读取Storage中的配置并更新
      const UrlUsrPwdArray = await getUrlUsrPwdArrayfromStorage()
      UrlUsrPwdArray[index] = {
        index: index,
        matchUrl: matchUrl,
        usernameSelector: usernameSelector,
        passwordSelector: passwordSelector
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
        passwordSelector: ""
      }
      saveUrlUsrPwdArraytoStorage(UrlUsrPwdArray)
      // 刷新页面
      location.reload();
    });
  });
})();



