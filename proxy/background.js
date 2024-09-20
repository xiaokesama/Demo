chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed.");
  });
  
  // 设置代理
  function setProxy(config) {
    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      function () {
        console.log("Proxy set:", config);
      }
    );
  }
  
  // 清除代理
  function clearProxy() {
    chrome.proxy.settings.clear({ scope: 'regular' }, function () {
      console.log("Proxy cleared");
    });
  }
  
  // 接收来自popup的消息
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setProxy') {
      setProxy(request.config);
      sendResponse({ status: 'Proxy set' });
    } else if (request.action === 'clearProxy') {
      clearProxy();
      sendResponse({ status: 'Proxy cleared' });
    }
  });