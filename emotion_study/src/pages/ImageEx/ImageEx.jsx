/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imageLayout = css`
    /* display: flex;
    justify-content: center;
    align-items: center;

    margin: 0px auto 20px;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 50%;

    overflow: hidden;
    cursor: pointer;
    width: 200px;
    height: 200px;

    & > img {
        width: 100%;
    } */

    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 20px;
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }

`;

function ImageEx() {
    const [ urls, setUrls ] = useState([]);
    const [ uploadFiles,setUploadFiles ] = useState([]);
    const [ previews, setPreviews ] = useState([]);
    const [ progressPercent, setProgressPercent] = useState([]);
    const imgFileRef = useRef();

    // useEffect(() => {
    //     setUrls(!localStorage.getItem("url") ? [] : JSON.parse(localStorage.getItem("url")));
    // },[]);


    const handleImgFileChange = (e) => {
        const files = Array.from(e.target.files);

        if(files.length === 0) {
            imgFileRef.current.value = "";
            return;
        }
        
        console.log(files);

        setUploadFiles(files);

        let promises = [];
        
        promises = files.map(file => new Promise((resolve) => {
            
            const fileReader = new FileReader();
            
            fileReader.onload =(e) => {
                resolve(e.target.result);
            }

            fileReader.readAsDataURL(file);
        }));
        
        // 다른 풀이
        // for(let  file of e.target.files){
        //     promises = [...promises, new Promise((resolve) => {
        //         const fileReader = new FileReader();
        //         fileReader.onload =(e) => {
        //             console.log(e.target.result);
        //             resolve(e.target.result);
        //         }
        //         fileReader.readAsDataURL(file);
        // })];
                    
            Promise.all(promises)
            .then(result => {
                setPreviews(result);

            })
            
        }
        
        const handleImageUpload = () => {

            let promises = [];

            promises = uploadFiles.map(uploadFile => new Promise((resolve) => {
                const storageRef = ref(storage, `files/test/${uuid()}_${uploadFile.name}`)
                const uploadTask = uploadBytesResumable(storageRef, uploadFile);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
                    },
                    (error) => {},
                    () => {
                        getDownloadURL(storageRef).then(url => {
                            localStorage.setItem("url",url);
                            setUrls(url);
                            setPreviews([]);
                        })
                    }
                );

            }))

            // Promise.all(promises)
            // .then(result => {
            //     result.on(

            //     )
            // })



            const file = uploadFiles[0]
            const storageRef = ref(storage, `files/test/${uuid()}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef).then(url => {
                        localStorage.setItem("url",url);
                        setUrls(url);
                        setPreviews([]);
                    })
                }
            );
        }


        
        
        
        
        
        return (
            <div css={layout}>
                {/* <div css={imageLayout}>
                    <img src={url} alt="" />
                </div> */}
            {
                previews.map((preview, index) => 
                <>
                    <div key={index} css={imageLayout}>
                        <img src={preview} alt="" />
                    </div>
                    <Line percent={progressPercent} strokeWidth={4} strokeColor={"#dbdbdbdb"}/>
                </>
                )
            }
            <input style={{display: "none"}} type="file" ref={imgFileRef} onChange={handleImgFileChange} multiple={true}/>
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx;