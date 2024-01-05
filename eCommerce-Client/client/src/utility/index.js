const BE_URL = process.env.REACT_APP_ADMIN_API_URL;
export const getFileURL = (url) => {
    if (!url) {
        return "#"
    }
    // /Users/7o4p3a/MyProject/E-commerce-Project/api/public/product/images/1703207441027-My project.png
    const imgSplit = url.split("public/");
    const imgURL = `${BE_URL}/${imgSplit[1]}`
    return imgURL
}
export const getFileURLs = (urls) => {
    // /Users/7o4p3a/MyProject/E-commerce-Project/api/public/product/images/1703207441027-My project.png
    let imageURLS = [];
    urls.forEach(url => {
        imageURLS.push(getFileURL(url))
    });
    return imageURLS
}

