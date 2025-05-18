import React, { useEffect } from "react";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const MyReactImageMagnify = React.memo((imgArr: any) => {
  const img: any = [];
  const func = () => {
    const arrlength = imgArr?.img.length;
    for (let i = 0; i < arrlength; i++) {
      for (let j = 0; j < imgArr?.img[i].length; j++) {
        img.push({
          original: imgArr?.img[i][j],
          thumbnail: imgArr?.img[i][j],
        });
      }
    }
    return img;
  };
  useEffect(() => {
    func();
  }, [imgArr]);
  return (
    <div>
      <ImageGallery
        items={img}
        showPlayButton={false}
        showFullscreenButton={true}
        slideInterval={1000}
        slideOnThumbnailOver={true}
        showIndex={true}
        onPlay={() => {
          alert("slideshow is now playing!");
        }}
      />
    </div>
  );
});

export default MyReactImageMagnify;
