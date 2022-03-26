import axios from "axios";
import { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { getThumbnails } from "video-metadata-thumbnails";

const CheckHelmet = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });
  var objectUrl = null;
  const [ImageUp, setImageUp] = useState(false);
  const [Image, setImage] = useState(null);
  const [ImageUrl, setImageUrl] = useState(null);

  //   const previewImage = (e) => {
  //     if (objectUrl != null) URL.revokeObjectURL(objectUrl);
  //     setImageUp(true);
  //     setImage(e.target.files[0]);
  //     objectUrl = URL.createObjectURL(e.target.files[0]);
  //     setImageUrl(objectUrl);
  //     console.log(objectUrl);
  //   };

//   const handleImageSubmit = () => {
//     // free memory when ever this component is unmounted
//   };
  const Start = () => {
    startRecording();
    setTimeout(() => {
      stopRecording();
    }, 5000);
  };
  useEffect(() => {
    mediaBlobUrl &&
      getThumbnails(mediaBlobUrl, { quality: 0.6 })
        .then((im) => {
          setImage(im);
          console.log(im);
        })
        .catch((err) => console.log(err));
  }, [mediaBlobUrl]);
  useEffect(() => {
    if (Image) {
    const objectUrlBlob = URL.createObjectURL(Image[0].blob);
    const options = {
      method: "POST",
      url: "https://helmet-detection.p.rapidapi.com/helmet-detection",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "helmet-detection.p.rapidapi.com",
        "X-RapidAPI-Key": "c0715810a2msh0ef7b0ac762df2ep10cd20jsn884bb8f16c20",
      },
      data: { url: objectUrlBlob },
    };
    console.log(options);

    axios
      .request(options)
      .then(function (response) {
        if (response.data[0].value === "helmet") {
          alert("You are good to go");
        } else {
          alert("Wear a Helmet properly");
        }
      })
      .catch(function (error) {
        console.error(error);
      });

    return () => URL.revokeObjectURL(objectUrlBlob);
    }
  }, [Image]);

  return (
    <>
      <p>{status}</p>
      <button onClick={Start}>Start Recording</button>
      <video src={mediaBlobUrl} id="video" autoPlay loop controls></video>
      {/* <img src={ImageUrl} alt="imgPre"/>
    <input type="file" height={'100px'} width={'100px'} alt="img" name="helmImage" onChange={previewImage}/> <br /> */}
    </>
  );
};

export default CheckHelmet;
