const path = require('path')

const uuid = require("uuid");
module.exports = async function saveImage(image, folder = ''){
    let name = uuid.v4()+'.jpg';

    const pathImage = path.resolve(__dirname, '..', 'static', folder, name)

    await image.mv(pathImage)
    return name;
}