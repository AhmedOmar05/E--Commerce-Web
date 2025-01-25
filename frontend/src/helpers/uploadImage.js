// const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

// const uploadImage  = async(image) => {
//     const formData = new FormData()
//     formData.append("file",image)
//     formData.append("upload_preset","mern_product")
    

//     const dataResponse = await fetch(url,{
//         method : "post",
//         body : formData
//     })

//     return dataResponse.json()

// }

// export default uploadImage 


const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
  
    // Send the form data to your server where Multer is set up to handle the file upload
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
  
    const data = await response.json();
  
    return data;
  };
  
  export default uploadImage;
  