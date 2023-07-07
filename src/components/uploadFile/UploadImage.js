import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../../assets/css/style-uploadfile.css'

const UploadImage = (props) => {
    const presetKey = "UserImage";
    const cloudName = "dr3rwgzpl";
    const apiKey = "552921944827948";
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const [fileImage, setFileImage] = useState(null);

    const handleFileInputChange = (e) => {
        setFileImage(e.target.files[0]);
    };

    const handleUploadButtonClick = (e) => {
        console.log('2');
        e.preventDefault();
        if (fileImage) {
            const data = new FormData();
            data.append("file", fileImage);
            data.append("upload_preset", presetKey);

            data.append("apiKey", apiKey);
            data.append("timestamp", timestamp);

            axios
                .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
                .then(res => {
                    console.log('image upload: ',res.data.secure_url)
                    props.setNewAvatar(res.data.secure_url);
                })
                .catch(err => console.log(err))
        }
    };

    useEffect(() => {
        if (fileImage) {
            const data = new FormData();
            data.append("file", fileImage);
            data.append("upload_preset", presetKey);

            data.append("apiKey", apiKey);
            data.append("timestamp", timestamp);

            axios
                .post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, data)
                .then(res => {
                    props.setNewAvatar(res.data.secure_url);
                })
                .catch(err => console.log(err))
        }
    }, [fileImage]);

    return (
        <>
            <input type="file" className="custom-file-input" onChange={handleFileInputChange} />
        </>
    );
};

export default UploadImage;