/* eslint-disable react/prop-types */
import "./../public/style.css";
import Masonry from "react-masonry-css";
import { useState, useEffect } from "react";

const App = () => {
  return (
    <>
      <Heading />
      <GifContainer />
    </>
  );
};

const Heading = () => {
  return <h1 className="heading">TRENDING GIF&apos;s</h1>;
};

const GifContainer = () => {
  const [dataFromUrl, setDataFromUrl] = useState([]);
  const URL = "https://api.giphy.com/v1/gifs/trending?api_key=  &limit=20";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        let data = await response.json();
        data = data.data.map((data) => {
          return data.images.original.url;
        });
        setDataFromUrl(data);
      } catch (error) {
        console.error("Error fetching GIFs:", error);
      }
    };
    fetchData();
  }, []);

  const breakpoints = {
    default: 4,
    1100: 3,
    700: 2,
    450: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {dataFromUrl.map((data, index) => {
        return <SingleGif imageSrc={data} key={data + index} />;
      })}
    </Masonry>
  );
};

const SingleGif = (props) => {
  return (
    <>
      <div>
        <img src={props.imageSrc} className="image" alt="GIF" />
      </div>
    </>
  );
};

export default App;
