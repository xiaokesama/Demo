function autoLogin() {
    // 等待元素加载
    const checkElement = setInterval(() => {
        const usernameElement = document.querySelector("#username");
        const passwordElement = document.querySelector("#password");
        // const submitButton = document.querySelector("#b_login");
        if (usernameElement && passwordElement) {
            usernameElement.value = "admin";
            passwordElement.value = "admin";
            clearInterval(checkElement);
            // submitButton.click();
        }
    }, 100);
}

autoLogin()

