import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFlowerInfo } from "../../components/services/api";
import { IExampleFlower } from "../../Types/IHome";
import "./FlowerInfo.scss";
import star from "../../media/img/pl-icon-star.png";

function FlowerInfo() {
  const { id } = useParams();
  const [oneFlowerInfo, setOneFlowerInfo] = useState<IExampleFlower>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try {
        const info = await fetchFlowerInfo(Number(id));
        setOneFlowerInfo(info.data.flower);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <>
      <div className="info-background">
        <img className="info-pic" src={oneFlowerInfo?.profile_picture} alt="" />
        <div className="info-data">
          <div className="info-like">
            <div className="info-star-container">
              <img src={star} alt="" />
            </div>
            <div className="info-sightings">
              {oneFlowerInfo?.sightings} Sightings
            </div>
          </div>
          <h1 className="info-name">{oneFlowerInfo?.name}</h1>
          <h3 className="info-latin-name">{oneFlowerInfo?.latin_name}</h3>
        </div>
        <button>+Add New Sighting</button>
      </div>
      <div className="info-bottom">
        <div className="info-left">
          <h4>Kingdom: Plantae</h4>
          <h4>Order: Asterales</h4>
          <h4>Family: Campanulaceae</h4>
          <h4>Species: P. grandiflorus</h4>
        </div>
        <div className="info-right">
          <div>
            {" "}
            Platycodon grandiflorus (from Ancient Greek πλατύς "wide" and κώδων
            "bell") is a species of herbaceous flowering perennial plant of the
            family Campanulaceae, and the only member of the genus Platycodon.
            It is native to East Asia (China, Korea, Japan, and the Russian Far
            East).[1] It is commonly known as balloon flower[2][3] (referring to
            the balloon-shaped flower buds), Chinese bellflower,[2] or
            platycodon.[2]{" "}
          </div>

          <div>
            {" "}
            Growing to 60 cm (24 in) tall by 30 cm (12 in) wide, it is an
            herbaceous perennial with dark green leaves and blue flowers in late
            summer. A notable feature of the plant is the flower bud which
            swells like a balloon before fully opening.[4] The five petals are
            fused together into a bell shape at the base, like its relatives,
            the campanulas. There are varieties with white, pink and purple
            blooms in cultivation.[5] In Korea, white flowers are more common.
            This plant[6] together with its cultivars 'Apoyama group'[7] and
            'Mariesii'[8] have gained the Royal Horticultural Society's Award of
            Garden Merit.
          </div>

          <div>{oneFlowerInfo?.description}</div>
        </div>
      </div>
    </>
  );
}

export default FlowerInfo;
