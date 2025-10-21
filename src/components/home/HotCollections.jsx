// src/components/home/HotCollections.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHotCollections } from "../../api"; // calls your env-based endpoint
import AuthorImage from "../../images/author_thumbnail.jpg"; // fallback
import nftImage from "../../images/nftImage.jpg"; // fallback
import CarouselOwl from "../UI/CarouselOwl"; // reusable carousel component
import Skeleton from "../UI/Skeleton"; // (skeleton loading state)


const HotCollections = () => {
  // 1) Local state for data + UI status
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2) One reusable fetch function (used on mount + retry)
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchHotCollections(); // hits https://.../hotCollections
      setCollections(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("Could not load hot collections.");
    } finally {
      setLoading(false);
    }
  };

  // 3) Fetch once when the component mounts
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {/* four skeleton cards to mirror your 4-up carousel */}
        <div className="row" style={{ marginTop: "1rem" }}>
          {[0, 1, 2, 3].map((i) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
              <div className="nft_coll">
                {/* image placeholder */}
                <Skeleton width="100%" height="220px" borderRadius="12px" />
                <div className="nft_coll_info" style={{ marginTop: "0.75rem" }}>
                  {/* title line */}
                  <Skeleton width="70%" height="18px" borderRadius="6px" />
                  {/* code line */}
                  <div style={{ marginTop: "0.5rem" }}>
                    <Skeleton width="40%" height="14px" borderRadius="6px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


  // 5) Main render — map real API data into your existing markup
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {/* ⬇️ Owl carousel wrapper, shows 4 at a time, moves 1 per click */}
          <div className="col-12">
            <CarouselOwl>
              {collections.map((collection) => (
                <div key={collection.id} className="item">
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={collection.nftImage || nftImage}
                          className="lazy img-fluid"
                          alt={collection.title || "NFT Collection"}
                        />
                      </Link>
                    </div>

                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage || AuthorImage}
                          alt={collection.author || "Author"}
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>

                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title || "Untitled"}</h4>
                      </Link>
                      <span>{collection.code || "ERC-192"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CarouselOwl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
