const Message = ({ title, text, actionLabel, onAction }) => {
  return (
    <section id="section-message" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>{title}</h2>
          <div className="small-border bg-color-2"></div>
          <p style={{ marginTop: "0.75rem" }}>{text}</p>

          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              style={{
                marginTop: "0.75rem",
                padding: "0.6rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Message;
