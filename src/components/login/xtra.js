import React from "react";

const deficiencies = [
  "Motorolje",
  "",
  "Frostvæske nivå",
  "Frostvæske frysepunkt",
  "Bremsevæske nivå",
  "Batteri",
  "Vindusvisker foran",
  "Vindusvisker bak",
  "Lyspærer foran",
  "Lyspærer bak",
  "Støtdempere foran",
  "Støtdempere bak",
  "Dekk foran",
  "Dekk bak",
  "Forstilling",
  "Bakstilling",
  "Bremseklosser foran",
  "Bremseklosser bak",
  "Eksosanlegg",
  "Tetthet motor",
  "Tetthet girkasse",
];

const ignoreKeys = [
  "xtra_id",
  "comment",
  "customer_phone",
  "created_at",
  "regno",
];

const Xtra = ({ xtra }) => {
  const keys = xtra
    ? Object.keys(xtra).filter((key) => ignoreKeys.indexOf(key) === -1)
    : [];

  if (keys.length === 0) {
    return <p>Ingen Xtraskjema for dette kjøretøyet finnes foreløpig.</p>;
  } else {
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Xtra</th>
              <th>Bør utbedres</th>
              <th>Under oppsyn</th>
              <th>OK</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key, i) => (
              <tr>
                <td>{deficiencies[i]}</td>
                <td>{xtra[key] === "2" && <span>X</span>}</td>
                <td>{xtra[key] === "1" && <span>X</span>}</td>
                <td>{xtra[key] === "0" && <span>X</span>}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Kommentar</strong>
              </td>
              <td colSpan="3">{xtra.comment || "-"}</td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
};

export default Xtra;
