const serializeProductImage = (filename: string) => {
    return `http://localhost:3333/uploads/products/${filename}`;

}
const serializeProfileImage = (filename: string) => {
    return `http://localhost:3333/uploads/profiles/${filename}`;
}

export {
    serializeProductImage,
    serializeProfileImage
}