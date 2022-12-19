import React, { useState } from "react";
import * as moment from "moment";

const HistoryOrderLines = ({ text }) => {
  const [showOrderLines, setShowOrderLines] = useState(false);

  const formattedText = text
    ? text.replace('["', "").replace('"]', "").split('","').join("<br />")
    : "";

  return (
    <React.Fragment>
      {showOrderLines && (
        <div dangerouslySetInnerHTML={{ __html: formattedText }} />
      )}
      <button
        className="secondary-button-small"
        onClick={(e) => {
          e.preventDefault();
          setShowOrderLines(!showOrderLines);
        }}
      >
        {showOrderLines ? "Skjul ordrelinjer" : "Vis ordrelinjer"}
      </button>
    </React.Fragment>
  );
};

const descending = (a, b) => (a.invoice_date < b.invoice_date ? 1 : -1);

const History = ({ history }) => {
  history = history.reverse();

  return (
    <>
      {history.length > 0 &&
        history.sort(descending).map((h, i) => (
          <div className="grid" key={`history-${i}`}>
            <div className="row">
              <div className="col-3" style={{ padding: "0.3rem 0 0.3rem 0" }}>Faktura dato</div>
              <div className="col-6" style={{ padding: "0.3rem 0 0.3rem 0" }}>
                <time>{moment(h.invoice_date).format("DD.MM.YY")}</time>
              </div>
            </div>
            <div>
              <div className="col-3" style={{ padding: "0.3rem 0 0.3rem 0" }}>Faktura nr.</div>
              <div className="col-6" style={{ padding: "0.3rem 0 0.3rem 0" }}>{h.invoice_no}</div>
            </div>
            <div>
              <div className="col-3" style={{ padding: "0.3rem 0 0.3rem 0" }}>Ordre type</div>
              <div className="col-6" style={{ padding: "0.3rem 0 0.3rem 0" }}>{h.order_type}</div>
            </div>
            <div>
              <div className="col-3" style={{ padding: "0.3rem 0 0.3rem 0" }}>Kilometerstand</div>
              <div className="col-6" style={{ padding: "0.3rem 0 0.3rem 0" }}>{h.mileage}</div>
            </div>
            <div>
              <div className="col-3" style={{ padding: "0.3rem 0 0.3rem 0" }}>Ordrelinjer</div>
              <div className="col-6" style={{ padding: "0.3rem 0 0.3rem 0" }}>
                <HistoryOrderLines text={h.text} />
              </div>
            </div>
            <div>
              <div className="col-3" style={{ padding: "0.3rem 0 0.3rem 0" }}>Verksted</div>
              <div className="col-6" style={{ padding: "0.3rem 0 0.3rem 0" }}>
                {h.workshop_name}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default History;
