// 读取本地存储的所有配置
async function getUrlUsrPwdArrayfromStorage() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['UrlUsrPwdArray'], function(result) {
        const UrlUsrPwdArray = result.UrlUsrPwdArray || [];
        resolve(UrlUsrPwdArray);
        });
    });
}

// 匹配URL是否与模式匹配
function isUrlMatching(pattern, url) {
    // 将模式中的'*'替换为正则表达式中的'.*'
    let regexPattern = pattern.replace(/\*/g, '.*');
    let regex = new RegExp('^' + regexPattern + '$');
    return regex.test(url);
}

// 遍历UrlUsrPwdArray，匹配当前URL，自动填入用户名密码
(async function(){
    const UrlUsrPwdArray = await getUrlUsrPwdArrayfromStorage()
    console.log(UrlUsrPwdArray)
    UrlUsrPwdArray.forEach(UrlUsrPwd => {
        if(UrlUsrPwd && UrlUsrPwd.matchUrl && isUrlMatching(UrlUsrPwd.matchUrl, window.location.href)){
            console.log('匹配到URL：' + window.location.href)
            const checkElement = setInterval(() => {  //setInterval 用于按照指定的时间间隔重复执行一个指定的函数
                usernameElement = document.querySelector(UrlUsrPwd.usernameSelector);
                passwordElement = document.querySelector(UrlUsrPwd.passwordSelector);
                submitButtonElement = document.querySelector(UrlUsrPwd.submitButtonSelector);
                if (usernameElement && passwordElement) {
                    console.log('自动填入用户名密码')
                    usernameElement.value = UrlUsrPwd.username;
                    usernameElement.innerText = UrlUsrPwd.username;
                    passwordElement.value = UrlUsrPwd.password;
                    passwordElement.innerText = UrlUsrPwd.password;
                    // 触发input事件，避免提示：请填写用户名和密码
                    const event = new Event('input', { bubbles: true });
                    usernameElement.dispatchEvent(event);
                    passwordElement.dispatchEvent(event);
                    clearInterval(checkElement);
                }
                if (submitButtonElement && UrlUsrPwd.toggleSwitch) {
                    setTimeout(() => {   //setTimeout 用于在指定的延迟时间后执行一次指定的函数
                        console.log("等待 0.1 秒");
                    }, 100);
                    console.log('点击提交按钮')
                    submitButtonElement.click()
                }
            }, 100);
            return;
        }
    });
})();

