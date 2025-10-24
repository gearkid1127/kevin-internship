import React, { useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import { fetchItemDetails } from "../api";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!id) return; // no request if there's no id
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const data = await fetchItemDetails(id);
        const itemData = Array.isArray(data) ? data[0] : data;
        if (!cancelled) setItem(itemData);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return loading ? (
    <section className="container">
      <div className="row">
        <div className="col-md-6 text-center">
          <Skeleton height="400px" />
        </div>
        <div className="col-md-6">
          <Skeleton/>
          <Skeleton  />
          <Skeleton  />
        </div>
        <div className="col-md-12 mt-4 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Skeleton />
            <div className="ms-2">
              <Skeleton  />
              <Skeleton  />
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Skeleton circle={true} height="40px" width="40px" />
            <div className="ms-2">
              <Skeleton  />
              <Skeleton  />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item?.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item?.title || ""}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>Rainbow Style #194</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item?.likes}
                    </div>
                  </div>
                  <p>
                    {item?.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.ownerId}`}>
                            <img className="lazy" src={item?.ownerImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.authorId}`}>{item?.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item?.creatorId}`}>
                            <img className="lazy" src={item?.creatorImage || AuthorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item?.creatorId}`}>{item?.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item?.price ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
