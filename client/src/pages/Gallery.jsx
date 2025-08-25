import { useState } from "react";

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const categories = [
    {
      type: "Dogs",
      photos: ["dog1.jpeg","dog2.jpeg","dog3.jpeg","dog4.jpeg"],
      captions: ["Diamond","Lucky","Calla","Star"],
      descriptions: ["Yorkshire Terrier","Golden Retriever","Rottweiler","Papillon"],
      info: [
        "The Yorkshire Terrier is a small dog with a big personality. They are feisty and loving, and they make great companions for people of all ages.",
        "Golden Retrievers are friendly, intelligent, and devoted. They are great family pets and excellent working dogs.",
        "Rottweilers are confident, fearless, and good-natured. They make great guardians and loyal companions.",
        "Papillons are small, friendly, and energetic dogs. They are known for their butterfly-like ears and lively personality."
      ]
    },
    {
      type: "Cats",
      photos: ["cat1.png","cat2.jpeg","cat3.jpeg","cat4.png"],
      captions: ["Bobby","Nacy","Moon","Tofu"],
      descriptions: ["Domestic Shorthair","Domestic Shorthair","Domestic Shorthair","British Shorthair"],
      info: [
        "Bobby is a playful Domestic Shorthair who loves to explore and chase toys.",
        "Nacy is a calm and affectionate Domestic Shorthair who enjoys lounging in the sun.",
        "Moon is an adventurous Domestic Shorthair who loves to climb and play.",
        "Tofu is a friendly British Shorthair who enjoys cuddles and has a sweet disposition."
      ]
    },
    {
      type: "Small Animals",
      photos: ["samllanimal1.jpeg","samllanimal2.jpeg","samllanimal3.jpeg"], // matches your filenames
      captions: ["H","JJ","Apple"],
      descriptions: ["Hamster","Chinchilla","Hedgehog"],
      info: [
        "H is a curious Hamster who loves to run on his wheel and burrow in his bedding.",
        "JJ is a gentle Chinchilla who enjoys dust baths and nibbling on treats.",
        "Apple is a spiky yet friendly Hedgehog who loves to explore and curl up in a ball."
      ]
    }
  ];

  const items = categories.flatMap(cat =>
    cat.photos.map((photo, i) => ({
      key: `${cat.type}-${i}`,
      src: `/images/${photo}`,
      caption: cat.captions[i],
      description: cat.descriptions[i],
      info: cat.info[i]
    }))
  );

  return (
    <section id="gallery">
      <ul className="gallery-grid">
        {items.map(it => (
          <li key={it.key} className="photo-item">
            <img src={it.src} alt={it.caption} />
            <div className="caption">{it.caption}</div>
            <div
              className="description"
              role="button"
              tabIndex={0}
              onClick={() => setSelected({ caption: it.caption, info: it.info })}
              onKeyDown={(e) => e.key === "Enter" && setSelected({ caption: it.caption, info: it.info })}
            >
              {it.description}
            </div>
          </li>
        ))}
      </ul>

      {selected && (
        <div id="info-box">
          <h2>{selected.caption}</h2>
          <p>{selected.info}</p>
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </section>
  );
}
