
  export const deleteImage = async (pic) => {
    const timestamp = new Date().getTime()
    const string = `public_id=${pic.public_id}&timestamp=${timestamp}<add your api secret>`
    const signature = await sha1(string)
    const formData = new FormData()
    formData.append("public_id", pic.public_id)
    formData.append("signature",signature)
    formData.append("api_key", process.env.REACT_APP_API_KEY)
    formData.append("timestamp",timestamp)
    const res = await ax.post("https://api.cloudinary.com/v1_1/<your cloud name>/image/destroy", formData) 
}
