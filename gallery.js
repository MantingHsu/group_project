import React, { useState } from "react";
import "../styles/Gallery.scss"; // You can rename to App.scss if needed

export default function Gallery() {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const categories = [
    {
      type: "Dogs",
      photos: ["dog1.jpeg", "dog2.jpeg", "dog3.jpeg", "dog4.jpeg"],
      captions: ["Diamond", "Lucky", "Calla", "Star"],
      descriptions: ["Yorkshire Terrier", "Golden Retriever", "Rottweiler", "Papillon"],
      info: [
        "The Yorkshire Terrier is a small dog with a big personality. They are feisty and loving, and they make great companions for people of all ages.",
        "Golden Retrievers are friendly, intelligent, and devoted. They are great family pets and excellent working dogs.",
        "Rottweilers are confident, fearless, and good-natured. They make great guardians and loyal companions.",
        "Papillons are small, friendly, and energetic dogs. They are known for their butterfly-like ears and lively personality."
      ]
    },
    {
      type: "Cats",
      photos: ["cat1.png", "cat2.jpeg", "cat3.jpeg", "cat4.png"],
      captions: ["Bobby", "Nacy", "Moon", "Tofu"],
      descriptions: ["Domestic Shorthair", "Domestic Shorthair", "Domestic Shorthair", "British Shorthair"],
      info: [
        "Bobby is a playful Domestic Shorthair who loves to explore and chase toys.",
        "Nacy is a calm and affectionate Domestic Shorthair who enjoys lounging in the sun.",
        "Moon is an adventurous Domestic Shorthair who loves to climb and play.",
        "Tofu is a friendly British Shorthair who enjoys cuddles and has a sweet disposition."
      ]
    },
    {
      type: "Small Animals",
      photos: ["samllanimal1.jpeg", "samllanimal2.jpeg", "samllanimal3.jpeg"],
      captions: ["H", "JJ", "Apple"],
      descriptions: ["Hamster", "Chinchilla", "Hedgehog"],
      info: [
        "H is a curious Hamster who loves to run on his wheel and burrow in his bedding.",
        "JJ is a gentle Chinchilla who enjoys dust baths and nibbling on treats.",
        "Apple is a spiky yet friendly Hedgehog who loves to explore and curl up in a ball."
      ]
    }
  ];

  const handleDescriptionClick = (caption, info) => {
    setSelectedInfo({ caption, info });
  };

  const handleClose = () => {
    setSelectedInfo(null);
  };

  return (
    <div className="gallery-page">
      <ul id="photo-gallery" className="photo-gallery">
        {categories.map((category) =>
          category.photos.map((photo, index) => (
            <li className="photo-item" key={`${category.type}-${index}`}>
              <img
                src={`/images/${photo}`}
                alt={category.captions[index]}
                className="gallery-image"
              />
              <div className="caption">{category.captions[index]}</div>
              <div
                className="description"
                onClick={() =>
                  handleDescriptionClick(
                    category.captions[index],
                    category.info[index]
                  )
                }
              >
                {category.descriptions[index]}
              </div>
            </li>
          ))
        )}
      </ul>

      {selectedInfo && (
        <div id="info-box" className="info-box">
          <h2 id="info-heading">{selectedInfo.caption}</h2>
          <p id="info-text">{selectedInfo.info}</p>
          <button id="close-info-box" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
