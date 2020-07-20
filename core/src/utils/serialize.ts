const serializeProductImage = (filename: string) => {
    return `https://vitrine-core.herokuapp.com/uploads/products/${filename}`;

}
const serializeProfileImage = (filename: string) => {
    return `https://vitrine-core.herokuapp.com/uploads/profiles/${filename}`;
}

export {
    serializeProductImage,
    serializeProfileImage
}