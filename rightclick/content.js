const download_btn = document.createElement("button");
download_btn.id = "asdf";
download_btn.style.background = "purple";
download_btn.style.color = "white";
download_btn.style.fontSize = "11px";
download_btn.style.padding = "4px 11px";
download_btn.style.marginLeft = "11px";
download_btn.style.border = "none";
download_btn.style.borderRadius = "3px";
download_btn.innerHTML = "Download";
download_btn.style.cursor = "pointer";


function addDownloadButton(button) {
    button.addEventListener("click", function() {
        console.log("Download button clicked");
    });
}

window.onload = function() {
    console.log("Page loaded");
    ems = document.querySelectorAll(".table-operator");
    console.log("finding ems");
    for (var i = 0; i < ems.length; i++) {
        const newButton = download_btn.cloneNode(true);
        addDownloadButton(newButton)
        ems[i].appendChild(newButton);
    }
}

// 处理内容变化的函数
function handleContentChange() {
    console.log('Content updated for URL:', window.location.href);
    // 在这里添加更新页面内容的逻辑
}

// 重写 history.pushState
const originalPushState = history.pushState;
history.pushState = function(...args) {
    // 调用原始方法
    originalPushState.apply(this, args);
    handleContentChange(); // URL 变化时调用
};