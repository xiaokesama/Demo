// 先前生效的那一项按钮打开
function loadProxySettings() {
  chrome.storage.local.get(['proxyHost', 'proxyPort'], function(result) {
    console.log('proxyHost currently is: ' + result.proxyHost);
    console.log('proxyPort currently is: ' + result.proxyPort);
  });
  // 这个填写chrome.storage中拿到的数据到页面上
  // 获取生效的配置
  chrome.proxy.settings.get({}, (details) => {
    if (details.value.mode === "fixed_servers") {
      const proxy = details.value.rules.singleProxy;
      document.getElementById('proxyHost1').value = proxy.host;
      document.getElementById('proxyPort1').value = proxy.port;
    }
  });
}

// 初始化时加载当前的代理设置
loadProxySettings();

const setProxyButtons = document.querySelectorAll('.setProxy');
const clearProxyButtons = document.querySelectorAll('.clearProxy');

setProxyButtons.forEach(button => {
  button.addEventListener('click', function() {
    const inputContainers = button.parentElement;
    const inputs = inputContainers.querySelectorAll('input');
    const host = inputs[0].value;
    const port = parseInt(inputs[1].value,10);

    const proxyConfig = {
      mode: "fixed_servers",
      rules: {
        singleProxy: {
          scheme: "http",
          host: host,
          port: port
        }
      }
    };

    chrome.runtime.sendMessage({ action: 'setProxy', config: proxyConfig }, (response) => {
      console.log(response.status);
    });

    // 这里加条件判断就可以存储多个值了，使用switch语法
    chrome.storage.local.set({ 
      proxyHost: host,
      proxyPort: port
    }, function() {
      console.log('Data saved');
    });
    
  });
});

clearProxyButtons.forEach(button => {
  button.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'clearProxy' }, (response) => {
      const inputContainers = button.parentElement;
      const inputs = inputContainers.querySelectorAll('input');
      console.log(response.status);
      inputs.forEach(input => {
        input.value = "";
      })
    });
  });
});