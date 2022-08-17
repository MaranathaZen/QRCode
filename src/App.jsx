import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import Header from "./components/header";
import Footer from "./components/footer";
import Plus from "./assets/plus.svg";
import Minus from "./assets/minus.svg";

export default function App() {
  const imageFile = useRef(null);
  const [allType, setAllType] = useState({
    dotColorType: "single",
    cornerSquareColorType: "single",
    cornerDotColorType: "single",
    backgroundColorType: "single",
  });
  //Hide and show height
  const [options, setOptions] = useState({
    main: true,
    dot: false,
    cornerSquare: false,
    cornerDot: false,
    Background: false,
    Image: false,
  });

  const [url, setUrl] = useState("https://qrcodeindo.netlify.app/");
  const [styleData, setStyleData] = useState({
    width: 300,
    height: 300,
    margin: 0,
    //Dots Options
    dotStyle: "extra-rounded",
    dotColor: "#6A1A4C",
    dotGradient1: "#6A1A4C",
    dotGradient2: "#6A1A4C",
    dotGradientRotation: 0,
    dotGradientType: "linear",
    // Corner Square Options
    cornerSquareStyle: "extra-rounded",
    cornerSquareColor: "extra-rounded",
    cornerSquareGradient1: "#00000",
    cornerSquareGradient2: "#00000",
    cornerSquareGradientRotation: 0,
    cornerSquareGradientType: "linear",
    // Corner Dot Options
    cornerDotStyle: "",
    cornerDotColor: "#00000",
    cornerDotGradient1: "#00000",
    cornerDotGradient2: "#00000",
    cornerDotGradientRotation: 0,
    cornerDotGradientType: "linear",
    // Background Options
    backgroundColor: "#ffffff",
    backgroundGradient1: "#ffff",
    backgroundGradient2: "#ffff",
    backgroundGradientRotation: 0,
    backgroundGradientType: "linear",
    //Image Options
    hideBackgroundDots: true,
    imageSize: 0.4,
    imageOptionMargin: 0,
  });
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);
  const [file, setFile] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
  );
  const [qrCode, setQrcode] = useState();

  useEffect(() => {
    if (qrCode) {
      qrCode.append(ref.current);
    }
  }, [qrCode]);

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: styleData.width,
      height: styleData.height,
      margin: styleData.margin,
      image: file,
      dotsOptions: {
        type: styleData.dotStyle, // Extra Rounded
        color: allType.dotColorType === "single" ? styleData.dotColor : "",
        gradient:
          allType.dotColorType === "gradient"
            ? {
                type: styleData.dotGradientType,
                colorStops: [
                  { offset: 0, color: styleData.dotGradient1 },
                  { offset: 1, color: styleData.dotGradient2 },
                ],
                rotation: styleData.dotGradientRotation,
              }
            : "",
      },
      cornersSquareOptions: {
        type: styleData.cornerSquareStyle,
        color:
          allType.cornerSquareColorType === "single"
            ? styleData.cornerSquareColor
            : "",
        gradient:
          allType.cornerSquareColorType === "gradient"
            ? {
                type: styleData.cornerSquareGradientType,
                colorStops: [
                  { offset: 0, color: styleData.cornerSquareGradient1 },
                  { offset: 1, color: styleData.cornerSquareGradient2 },
                ],
                rotation: styleData.cornerSquareGradientRotation,
              }
            : "",
      },
      cornersDotOptions: {
        type: styleData.cornerDotStyle,
        color:
          allType.cornerDotColorType === "single"
            ? styleData.cornerDotColor
            : "",
        gradient:
          allType.cornerDotColorType === "gradient"
            ? {
                type: styleData.cornerDotGradientType,
                colorStops: [
                  { offset: 0, color: styleData.cornerDotGradient1 },
                  { offset: 1, color: styleData.cornerDotGradient2 },
                ],
                rotation: styleData.cornerDotGradientRotation,
              }
            : "",
      },
      backgroundOptions: {
        color:
          allType.backgroundColorType === "single"
            ? styleData.backgroundColor
            : "",
        gradient:
          allType.backgroundColorType === "gradient"
            ? {
                type: styleData.backgroundGradientType,
                colorStops: [
                  { offset: 0, color: styleData.backgroundGradient1 },
                  { offset: 1, color: styleData.backgroundGradient2 },
                ],
                rotation: styleData.backgroundGradientRotation,
              }
            : "",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: styleData.imageOptionMargin,
        imageSize: styleData.imageSize,
        hideBackgroundDots: styleData.hideBackgroundDots,
      },
    });

    setQrcode(qr);
  }, [file, styleData, allType]);

  useEffect(() => {
    if (qrCode) {
      qrCode.update({
        data: url,
      });
    }
  }, [url, qrCode]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt,
    });
  };

  const fileHandler = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  // Normal Input Handler
  const inputHandler = (e) => {
    console.log(e.target.value);
    setStyleData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  //Options hide & show handler
  const optionHandler = (e) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        [e.target.id]: !prevState[e.target.id],
      };
    });
  };
  const option2Handler = (e) => {
    setOptions((prevState) => {
      return {
        ...prevState,
        [e.target.name]: !prevState[e.target.name],
      };
    });
  };

  const radioHandler = (e) => {
    setAllType((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const cancelHandler = () => {
    setFile("");
    imageFile.current.value = "";
  };

  return (
    <div className="h-full">
      <Header />
      <div className="flex flex-col md:flex-row w-full lg:py-12 lg:px-24 h-full">
        {/* Main Options  */}
        <div>
          <div className="p-3 bg-[#f4f4f4]">Main Options</div>
          <div id="main" className="flex flex-col gap-3 p-3">
            <div className="flex items-center gap-2">
              <label className="w-[10rem]">URL Link</label>
              <input
                className="p-3 border rounded-md"
                value={url}
                onChange={onUrlChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Image File :</label>
                <input
                  ref={imageFile}
                  type="file"
                  onChange={(e) => fileHandler(e)}
                />
              </div>
              <button
                onClick={() => cancelHandler()}
                className="bg-[#f4f4f4] p-3"
              >
                Cancel
              </button>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[10rem]">Width</label>
              <input
                type="number"
                id="width"
                className="p-3 border rounded-md"
                value={styleData.width}
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[10rem]">Height</label>
              <input
                type="number"
                id="height"
                className="p-3 border rounded-md"
                value={styleData.height}
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[10rem]">Margin</label>
              <input
                type="number"
                id="margin"
                className="p-3 border rounded-md"
                value={styleData.margin}
                onChange={(e) => inputHandler(e)}
              />
            </div>
          </div>
          {/* Dots Options  */}
          <div
            id="dot"
            onClick={(e) => optionHandler(e)}
            className="cursor-pointer p-3 bg-[#f4f4f4] flex items-center justify-between"
          >
            <span>Dots Options</span>
            {options.dot ? (
              <img
                name="dot"
                onClick={(e) => option2Handler(e)}
                src={Minus}
                alt=""
              />
            ) : (
              <img
                name="dot"
                onClick={(e) => option2Handler(e)}
                src={Plus}
                alt=""
              />
            )}
          </div>
          <div
            id="dots"
            className={`${options.dot ? "show-height" : "hide-height"}`}
          >
            <div className="p-3 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Dots Style</label>
                <select
                  value={styleData.dotStyle}
                  id="dotStyle"
                  onChange={(e) => inputHandler(e)}
                >
                  <option value="square">Square</option>
                  <option value="dots">Dots</option>
                  <option value="rounded">Rounded</option>
                  <option value="extra-rounded">Extra Rounded</option>
                  <option value="classy">Classy</option>
                  <option value="classy-rounded">Classy Rounded</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Color Type</label>
                <div className="flex flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="dotColorType"
                      name="dotColorType"
                      type="radio"
                      checked={allType.dotColorType === "single" ? true : false}
                      value="single"
                    />
                    <label>Single Color</label>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="dotColorType"
                      name="dotColorType"
                      type="radio"
                      checked={
                        allType.dotColorType === "gradient" ? true : false
                      }
                      value="gradient"
                    />
                    <label className="whitespace-nowrap">Color Gradient</label>
                  </div>
                </div>
              </div>
              {allType.dotColorType === "single" && (
                <div className="flex items-center gap-2">
                  <label className="w-[10rem]">Dots Color</label>
                  <input
                    id="dotColor"
                    value={styleData.dotColor}
                    onChange={(e) => inputHandler(e)}
                    type="color"
                    className="w-[10rem]"
                  />
                </div>
              )}
              {allType.dotColorType === "gradient" && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Gradient Type</label>
                    <div className="flex items-center gap-2">
                      <div className="flex itmes-center gap-2">
                        <input
                          name="gradient"
                          onClick={(e) => inputHandler(e)}
                          id="dotGradientType"
                          type="radio"
                          value="linear"
                          checked={
                            styleData.dotGradientType === "linear"
                              ? true
                              : false
                          }
                        />
                        <label>Linear</label>
                      </div>
                      <div className="flex itmes-center gap-2">
                        <input
                          name="gradient"
                          onClick={(e) => inputHandler(e)}
                          id="dotGradientType"
                          type="radio"
                          value="radial"
                          checked={
                            styleData.dotGradientType === "radial"
                              ? true
                              : false
                          }
                        />
                        <label>Gradient</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Dots Gradient</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={styleData.dotGradient1}
                        onChange={(e) => inputHandler(e)}
                        id="dotGradient1"
                      />
                      <input
                        type="color"
                        value={styleData.dotGradient2}
                        onChange={(e) => inputHandler(e)}
                        id="dotGradient2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Rotation</label>
                    <input
                      id="dotGradientRotation"
                      value={styleData.dotGradientRotation}
                      onChange={(e) => inputHandler(e)}
                      className="p-3 border rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Corner Square Options  */}
          <div
            id="cornerSquare"
            onClick={(e) => optionHandler(e)}
            className="cursor-pointer p-3 bg-[#f4f4f4] flex items-center justify-between w-full"
          >
            <span>Corners Square Options</span>
            {options.cornerSquare ? (
              <img
                name="cornerSquare"
                onClick={(e) => option2Handler(e)}
                src={Minus}
                alt=""
              />
            ) : (
              <img
                name="cornerSquare"
                onClick={(e) => option2Handler(e)}
                src={Plus}
                alt=""
              />
            )}
          </div>
          <div
            className={`${
              options.cornerSquare ? "show-height" : "hide-height"
            }`}
          >
            <div className="p-3 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Corners Square Style</label>
                <select
                  value={styleData.cornerSquareStyle}
                  id="cornerSquareStyle"
                  onChange={(e) => inputHandler(e)}
                >
                  <option value="">None</option>
                  <option value="square">Square</option>
                  <option value="dots">Dot</option>
                  <option value="extra-rounded">Extra Rounded</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Color Type</label>
                <div className="flex flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="cornerSquareColorType"
                      name="cornerSquareColorType"
                      type="radio"
                      checked={
                        allType.cornerSquareColorType === "single"
                          ? true
                          : false
                      }
                      value="single"
                    />
                    <label>Single Color</label>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="cornerSquareColorType"
                      name="cornerSquareColorType"
                      type="radio"
                      checked={
                        allType.cornerSquareColorType === "gradient"
                          ? true
                          : false
                      }
                      value="gradient"
                    />
                    <label className="whitespace-nowrap">Color Gradient</label>
                  </div>
                </div>
              </div>
              {allType.cornerSquareColorType === "single" && (
                <div className="flex items-center gap-2">
                  <label className="w-[10rem]">Dots Color</label>
                  <input
                    id="cornerSquareColor"
                    onChange={(e) => inputHandler(e)}
                    type="color"
                    className="w-[10rem]"
                  />
                </div>
              )}
              {allType.cornerSquareColorType === "gradient" && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Gradient Type</label>
                    <div className="flex items-center gap-2">
                      <div className="flex itmes-center gap-2">
                        <input
                          name="cornerSquareGradient"
                          onClick={(e) => inputHandler(e)}
                          id="cornerSquareGradientType"
                          type="radio"
                          value="linear"
                          checked={
                            styleData.cornerSquareGradientType === "linear"
                              ? true
                              : false
                          }
                        />
                        <label>Linear</label>
                      </div>
                      <div className="flex itmes-center gap-2">
                        <input
                          name="cornerSquareGradient"
                          onClick={(e) => inputHandler(e)}
                          id="cornerSquareGradientType"
                          type="radio"
                          value="radial"
                          checked={
                            styleData.cornerSquareGradientType === "radial"
                              ? true
                              : false
                          }
                        />
                        <label>Gradient</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Dots Gradient</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={styleData.cornerSquareGradient1}
                        onChange={(e) => inputHandler(e)}
                        id="cornerSquareGradient1"
                      />
                      <input
                        type="color"
                        value={styleData.cornerSquareGradient2}
                        onChange={(e) => inputHandler(e)}
                        id="cornerSquareGradient2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Rotation</label>
                    <input
                      id="cornerSquareGradientRotation"
                      value={styleData.cornerSquareGradientRotation}
                      onChange={(e) => inputHandler(e)}
                      className="p-3 border rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Corners Dot Options  */}
          <div
            id="cornerDot"
            onClick={(e) => optionHandler(e)}
            className="cursor-pointer p-3 bg-[#f4f4f4] flex items-center justify-between"
          >
            <span>Corners Dot Options</span>
            {options.cornerDot ? (
              <img
                name="cornerDot"
                onClick={(e) => option2Handler(e)}
                src={Minus}
                alt=""
              />
            ) : (
              <img
                name="cornerDot"
                onClick={(e) => option2Handler(e)}
                src={Plus}
                alt=""
              />
            )}
          </div>
          <div
            className={`${options.cornerDot ? "show-height" : "hide-height"}`}
          >
            <div className="p-3 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Corners Dot Style</label>
                <select id="cornerDotStyle" onChange={(e) => inputHandler(e)}>
                  <option value="">None</option>
                  <option value="square">Square</option>
                  <option value="dots">Dot</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Color Type</label>
                <div className="flex flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="cornerDotColorType"
                      name="cornerDotColorType"
                      type="radio"
                      checked={
                        allType.cornerDotColorType === "single" ? true : false
                      }
                      value="single"
                    />
                    <label>Single Color</label>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="cornerDotColorType"
                      name="cornerDotColorType"
                      type="radio"
                      checked={
                        allType.cornerDotColorType === "gradient" ? true : false
                      }
                      value="gradient"
                    />
                    <label className="whitespace-nowrap">Color Gradient</label>
                  </div>
                </div>
              </div>
              {allType.cornerDotColorType === "single" && (
                <div className="flex items-center gap-2">
                  <label className="w-[10rem]">Dots Color</label>
                  <input
                    id="cornerDotColor"
                    onChange={(e) => inputHandler(e)}
                    type="color"
                    className="w-[10rem]"
                  />
                </div>
              )}
              {allType.cornerDotColorType === "gradient" && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Gradient Type</label>
                    <div className="flex items-center gap-2">
                      <div className="flex itmes-center gap-2">
                        <input
                          name="cornerDotGradient"
                          onClick={(e) => inputHandler(e)}
                          id="cornerDotGradientType"
                          type="radio"
                          value="linear"
                          checked={
                            styleData.cornerDotGradientType === "linear"
                              ? true
                              : false
                          }
                        />
                        <label>Linear</label>
                      </div>
                      <div className="flex itmes-center gap-2">
                        <input
                          name="cornerDotGradient"
                          onClick={(e) => inputHandler(e)}
                          id="cornerDotGradientType"
                          type="radio"
                          value="radial"
                          checked={
                            styleData.cornerDotGradientType === "radial"
                              ? true
                              : false
                          }
                        />
                        <label>Gradient</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Dots Gradient</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={styleData.cornerDotGradient1}
                        onChange={(e) => inputHandler(e)}
                        id="cornerDotGradient1"
                      />
                      <input
                        type="color"
                        value={styleData.cornerDotGradient2}
                        onChange={(e) => inputHandler(e)}
                        id="cornerDotGradient2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Rotation</label>
                    <input
                      id="cornerDotGradientRotation"
                      value={styleData.cornerDotGradientRotation}
                      onChange={(e) => inputHandler(e)}
                      className="p-3 border rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Background Options  */}
          <div
            id="Background"
            onClick={(e) => optionHandler(e)}
            className="cursor-pointer p-3 bg-[#f4f4f4] flex items-center justify-between"
          >
            <span>Background Options</span>
            {options.Background ? (
              <img
                name="Background"
                onClick={(e) => option2Handler(e)}
                src={Minus}
                alt=""
              />
            ) : (
              <img
                name="Background"
                onClick={(e) => option2Handler(e)}
                src={Plus}
                alt=""
              />
            )}
          </div>
          <div
            className={`${options.Background ? "show-height" : "hide-height"}`}
          >
            <div className="p-3 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Color Type</label>
                <div className="flex flex-row md:items-center gap-2">
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="backgroundColorType"
                      name="backgroundColorType"
                      type="radio"
                      checked={
                        allType.backgroundColorType === "single" ? true : false
                      }
                      value="single"
                    />
                    <label>Single Color</label>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <input
                      onClick={(e) => radioHandler(e)}
                      id="backgroundColorType"
                      name="backgroundColorType"
                      type="radio"
                      checked={
                        allType.backgroundColorType === "gradient"
                          ? true
                          : false
                      }
                      value="gradient"
                    />
                    <label className="whitespace-nowrap">Color Gradient</label>
                  </div>
                </div>
              </div>
              {allType.backgroundColorType === "single" && (
                <div className="flex items-center gap-2">
                  <label className="w-[10rem]">Background Color</label>
                  <input
                    value={styleData.backgroundColor}
                    id="backgroundColor"
                    onChange={(e) => inputHandler(e)}
                    type="color"
                    className="w-[10rem]"
                  />
                </div>
              )}
              {allType.backgroundColorType === "gradient" && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Gradient Type</label>
                    <div className="flex items-center gap-2">
                      <div className="flex itmes-center gap-2">
                        <input
                          name="backgroundGradient"
                          onClick={(e) => inputHandler(e)}
                          id="backgroundGradientType"
                          type="radio"
                          value="linear"
                          checked={
                            styleData.backgroundGradientType === "linear"
                              ? true
                              : false
                          }
                        />
                        <label>Linear</label>
                      </div>
                      <div className="flex itmes-center gap-2">
                        <input
                          name="backgroundGradient"
                          onClick={(e) => inputHandler(e)}
                          id="backgroundGradientType"
                          type="radio"
                          value="radial"
                          checked={
                            styleData.backgroundGradientType === "radial"
                              ? true
                              : false
                          }
                        />
                        <label>Gradient</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Background Gradient</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={styleData.backgroundGradient1}
                        onChange={(e) => inputHandler(e)}
                        id="backgroundGradient1"
                      />
                      <input
                        type="color"
                        value={styleData.cornerDotGradient2}
                        onChange={(e) => inputHandler(e)}
                        id="backgroundGradient2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-[10rem]">Rotation</label>
                    <input
                      id="backgroundGradientRotation"
                      value={styleData.backgroundGradientRotation}
                      onChange={(e) => inputHandler(e)}
                      className="p-3 border rounded-md"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Image Options  */}
          <div
            id="Image"
            onClick={(e) => optionHandler(e)}
            className="cursor-pointer p-3 bg-[#f4f4f4] flex items-center justify-between"
          >
            <span>Image Options</span>
            {options.Image ? (
              <img
                name="Image"
                onClick={(e) => option2Handler(e)}
                src={Minus}
                alt=""
              />
            ) : (
              <img
                name="Image"
                onClick={(e) => option2Handler(e)}
                src={Plus}
                alt=""
              />
            )}
          </div>
          <div className={`${options.Image ? "show-height" : "hide-height"}`}>
            <div className="p-3 flex flex-col gap-5">
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Hide Background Dots</label>
                <input
                  className="ml-1"
                  id="hideBackgroundDots"
                  type="checkbox"
                  value={styleData.hideBackgroundDots}
                  onChange={(e) =>
                    setStyleData((prevState) => {
                      return {
                        ...prevState,
                        [e.target.id]: !prevState[e.target.id],
                      };
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Image Size</label>
                <input
                  type="number"
                  id="imageSize"
                  value={styleData.imageSize}
                  onChange={(e) => inputHandler(e)}
                  className="border p-3"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="w-[10rem]">Margin</label>
                <input
                  type="number"
                  id="imageOptionMargin"
                  value={styleData.imageOptionMargin}
                  onChange={(e) => inputHandler(e)}
                  className="border p-3"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center lg:w-fit lg:fixed lg:top-[20%] lg:left-[60%]">
          <div ref={ref} className="flex justify-center" />
          <div className="flex items-center gap-2 mt-3 mb-5 px-12 lg:px-0 w-full lg:w-full justify-center">
            <button
              className="bg-black text-white p-3 w-full"
              onClick={onDownloadClick}
            >
              Download
            </button>
            <select
              className="p-3 border border-black w-full"
              onChange={onExtensionChange}
              value={fileExt}
            >
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
            </select>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
