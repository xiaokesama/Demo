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
            const checkElement = setInterval(() => {
                usernameElement = document.querySelector(UrlUsrPwd.usernameSelector);
                passwordElement = document.querySelector(UrlUsrPwd.passwordSelector);
                // const submitButton = document.querySelector("#b_login");
                if (usernameElement && passwordElement) {
                    usernameElement.value = UrlUsrPwd.username;
                    passwordElement.value = UrlUsrPwd.password;
                    clearInterval(checkElement);
                    // submitButton.click();
                }
            }, 100);
            return;
        }
    });
})();

