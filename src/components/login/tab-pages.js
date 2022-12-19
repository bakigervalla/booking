import React from "react";

const MyPageTabs = ({ onTabSelected, tab, children }) => {
  const tabItems = ["Historikk", "Xtrasjekk skjema", "Innstillinger"];

  const selectTab = (index) => {
    onTabSelected(index);
  };
  return (
    <React.Fragment>
      <ul className="tab-pages">
        {tabItems.map((tabItem, index) => (
          <li
            key={`tab-${index}`}
            className={tab === index ? "tab-itm selected" : "tab-itm"}
            onClick={() => selectTab(index)}
          >
            {tabItem}
          </li>
        ))}
      </ul>
      {children}
    </React.Fragment>
  );
};

export default MyPageTabs;
