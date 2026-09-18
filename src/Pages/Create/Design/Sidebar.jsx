function SideBar({ availableItems, selectedItem, setSelectedItem, style }) {
  return (
    <aside>
      <p>Available Items</p>

      <div className="selected-info">
        <span>Selected: {selectedItem || "None"}</span>
        <span>Style: {style}</span>
      </div>

      <div className="sidebar-items">
        {availableItems.map((item) => (
          <button
            className={selectedItem === item ? "active" : ""}
            key={item}
            onClick={() => setSelectedItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default SideBar;
