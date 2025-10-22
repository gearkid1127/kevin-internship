import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useEffect, useState } from "react";
import { fetchTopSellers } from "../../api";
import Skeleton from "../../components/UI/Skeleton";
import Message from "../Message";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSellers = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchTopSellers();
      setSellers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching Top Sellers:", err);
      setError("Could not load Top Sellers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            {error && !loading && (
              <Message
                title="Top Sellers"
                text={error}
                actionLabel="Retry"
                onAction={loadSellers}
              />
            )}
            {loading ? (
              // ---- Skeletons while loading ----
              <ol className="author_list">
                {Array.from({ length: 12 }).map((_, i) => (
                  <li key={i}>
                    <div className="author_list_pp">
                      <div className="lazy pp-author">
                        <Skeleton />
                      </div>
                    </div>
                    <div className="author_list_info">
                      <Skeleton />
                      <Skeleton />
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              // ---- Real data from API ----
              <ol className="author_list">
                {sellers.map((s) => (
                  <li key={s.id}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={s.authorImage}
                          alt={s.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{s.authorName}</Link>
                      <span>{s.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
