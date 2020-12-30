const fs = require("fs");
const FormData = require("form-data");
function uploadFile(
  operationType,
  operationTypeFilePath,
  relativePath,
  serverUrl
) {
  operationType = operationType.toLowerCase();
  if (operationType.indexOf("dir") > -1) {
    uploadDir(operationType, relativePath, serverUrl);
  } else {
    let form = new FormData();
    form.append("fileType", "file");
    form.append("operationType", operationType);
    form.append("operationTypeFilePath", relativePath);
    if (fs.existsSync(operationTypeFilePath)) {
      form.append(
        "operationTypeFileStream",
        fs.readFileSync(operationTypeFilePath)
      );
    } else {
      form.append("operationTypeFileStream", "");
    }

    form.submit(serverUrl);
  }
}
function uploadDir(operationType, operationTypeFilePath, serverUrl) {
  let form = new FormData();
  form.append("fileType", "dir");
  form.append("operationType", operationType);
  form.append("operationTypeFilePath", operationTypeFilePath);
  form.append("operationTypeFileStream", "");
  form.submit(serverUrl, (err, res) => {
    //console.log(res);
  });
}
module.exports = uploadFile;