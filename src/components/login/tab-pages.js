import React, { useState } from "react";

const MyPageTabs = ({ onTabSelected, children }) => {
  const [tab, setTab] = useState(0);
  const tabItems = ["Historikk", "Xtrasjekk skjema", "Innstillinger"];

  const selectTab = (index) => {
    setTab(index);
    onTabSelected(index);
  };

  return (
    <React.Fragment>
      <div className="tab">
        {tabItems.map((tabItem, index) => (
          <ul
            key={`tab-${index}`}
            className={tab === index ? "tab selected" : "tab"}
            onClick={() => selectTab(index)}
          >
            <li className="tab-itm">{tabItem}</li>
          </ul>
        ))}
      </div>
      {children}
    </React.Fragment>
  );
};

export default MyPageTabs;
