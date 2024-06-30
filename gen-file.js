const fs = require('fs');
const path = require('path');

function generateFileList(directoryPath) {
    
    if (directoryPath.indexOf('.git')>-1 || directoryPath.indexOf('.history')>-1 || directoryPath.indexOf('.netlify')>-1) {
        return "";
    }
    console.info(directoryPath);
  const files = fs.readdirSync(directoryPath);
  let fileList = '<ul>';

  files.forEach(file => {
    const fullPath = path.join(directoryPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fileList += `<li>${file}/ ${generateFileList(fullPath)}</li>`;
    } else {
      fileList += `<li>${file}</li>`;
    }
  });

  fileList += '</ul>';
  return fileList;
}

const directoryPath = path.join(__dirname, '.');
const fileListHTML = generateFileList(directoryPath);

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>File List</title>
</head>
<body>
  ${fileListHTML}
</body>
</html>
`;

fs.writeFileSync(path.join(directoryPath, 'file.html'), htmlContent);

console.log('File list generated successfully.');
