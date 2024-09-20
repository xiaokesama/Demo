const dropArea = document.getElementById('dropArea');

// 防止默认的文件打开行为
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);    
    document.body.addEventListener(eventName, preventDefaults, false);    
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// 高亮拖放区域
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add('highlight');
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove('highlight');
    }, false);
});

// 处理文件上传
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    uploadFiles(files);
}

function uploadFiles(files) {
    const bucketName = 'xiang'; // 使用您的桶名
    const objectName = files[0].name; // 使用第一个文件的名称
    const url = `http://218.17.135.218:20100/${bucketName}/${objectName}`;

    // 使用 AWS SDK 生成签名
    const accessKeyId = 'hqvt'; // 替换为您的访问密钥
    const secretAccessKey = 'hqvt@2023'; // 替换为您的秘密密钥

    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: 'us-east-1', // 根据您的配置选择区域
        signatureVersion: 'v4'
    });

    const s3 = new AWS.S3({
        endpoint: 'http://218.17.135.218:20100',
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
    });

    const params = {
        Bucket: bucketName,
        Key: objectName,
        Body: files[0], // 上传的文件
        ContentType: files[0].type // 文件类型
    };

    s3.putObject(params, (err, data) => {
        if (err) {
            console.error('上传失败:', err);
            alert('上传失败：' + err.message);
        } else {
            alert('文件上传成功！');
            if (files.length > 0) {
                dropArea.value = url; // 获取第一个文件的名称
            }
        }
    });
}