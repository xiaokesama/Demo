chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "sampleMenu",
      title: "示例菜单",
      contexts: ["all"]
    });
  });
  
// // 处理点击事件
// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === "sampleMenu") {
//     const selectedText = info.selectionText;
//     console.log(`选中的文本: ${selectedText}`);
//     console.log(`选中的文本: ${tab.url}`);
//     // 在这里执行其他操作
//   }
// });

// chrome.webRequest.onBeforeRequest.addListener(
//   function(details) {
//       console.log("Request URL:", details.url);
//       return { cancel: true };
//   },
//   { urls: ["<all_urls>"] }, // 匹配所有 URL
// );


// chrome.webNavigation.onCompleted.addListener((details) => {
//   // 获取当前标签页的 ID
//   chrome.scripting.executeScript({
//       target: { tabId: details.tabId, allFrames: true },
//       files: ['content.js']
//   }).then(() => {
//     console.log(`content script injected into ${details.tabId}`);
//   });
// }, { url: [{ urlMatches: '.*' }] })
// ; // 匹配所有 URL