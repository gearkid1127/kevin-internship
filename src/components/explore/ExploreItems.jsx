import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import { fetchExplore } from "../../api";
import Skeleton from "../UI/Skeleton";
import Message from "../Message";
import Countdown from "../UI/Countdown";

const ExploreItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchExplore("");
        const normalized = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : [];
        setItems(normalized);
        console.log("Explore loaded:", normalized.length, "items");
      } catch (e) {
        console.error("Explore load failed:", e);
        setItems([]);
      }
    })();
  }, []);

  const [visible, setVisible] = useState(8);
  const list = items.slice(0, visible);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadItems = async (f = "") => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchExplore(f);
      const normalized = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : [];
      setItems(normalized);
      setVisible(8);
    } catch (e) {
      console.error("Explore load failed:", e);
      setItems([]);
      setError("Could not load explore items.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => {
            const value = e.target.value;
            setFilter(value);
            loadItems(value); // call your existing fetch logic
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {/* --- Render Skeletons While Loading ---
     This shows 8 placeholder cards using your <Skeleton /> component
     whenever `loading` is true. */}
      {loading && (
        <div className="row">
          {[...Array(8)].map((_, i) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={i}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <div className="lazy pp-author">
                    <Skeleton />
                  </div>
                </div>
                <div className="nft__item_wrap">
                  <Skeleton />
                </div>
                <div className="nft__item_info">
                  <Skeleton />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* --- Render Message On Error --- */}
      {!loading && error && (
        <Message
          title="Explore Items"
          text={error}
          actionLabel="Retry"
          onAction={() => loadItems(filter)}
        />
      )}

      {list.map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img
                  className="lazy"
                  src={item.authorImage || AuthorImage}
                  alt=""
                />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <Countdown endTime={item.expiryDate} />

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item?.nftId || item?.id}`}>
                <img
                  src={item.nftImage}
                  className="lazy nft__item_preview"
                  alt=""
                />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item.title || "Untitled"}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes ?? item.like ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      {visible < items.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              setVisible((v) => Math.min(v + 4, items.length));
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
