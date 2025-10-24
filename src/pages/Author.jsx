import React from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import { fetchAuthorById } from "../api";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  const [isFollowing, setIsFollowing] = React.useState(false);
  const [followersCount, setFollowersCount] = React.useState(0);

  async function handleCopy() {
    if (!author?.address) return;
    await navigator.clipboard.writeText(author.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  }

  React.useEffect(() => {
    if (!id) return; // no request if there's no id in the URL
    let cancelled = false;

    (async () => {
      const data = await fetchAuthorById(id);
      const authorData = Array.isArray(data) ? data[0] : data;
      console.log("author fetched", { id, data: authorData });
      if (!cancelled) setAuthor(authorData);
      const followKey = `follow:${id}`;
      const saved = localStorage.getItem(followKey) === "1";
      setIsFollowing(saved);
      setFollowersCount((authorData?.followers || 0) + (saved ? 1 : 0));
    })();

    return () => {
      cancelled = true;
    };
  }, [id]);

  function handleFollowToggle(e) {
    e.preventDefault(); // keep the page from jumping to "#"
    const followKey = `follow:${id}`;
    setIsFollowing((prev) => {
      const next = !prev;
      // adjust the visible followers count
      setFollowersCount((c) => Math.max(0, c + (next ? 1 : -1)));
      // persist choice for this author id
      localStorage.setItem(followKey, next ? "1" : "0");
      return next;
    });
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage={`url(${
            author?.banner || "images/author_banner.jpg"
          }) top`}
          style={{
            background: `url(${AuthorBanner}) top`,
          }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author?.authorImage || AuthorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "—"}
                          <span className="profile_username">
                            {author?.tag || ""}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address || ""}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy Text"
                            onClick={handleCopy}
                            disabled={!author?.address}
                          >
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {`${followersCount} followers`}
                      </div>
                      <Link
                        to="#"
                        className="btn-main"
                        onClick={handleFollowToggle}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={author?.nftCollection || []} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
