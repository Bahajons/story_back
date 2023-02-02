const fs=require('fs')

function delete_image(name) {
    filePath = `uploads/${name}`;
    fs.unlinkSync(filePath);
  }
  delete_image('cv.docx')
