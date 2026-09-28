function Options({ selectedItem, itemOptions, onAddItem }) {
  if (!selectedItem || !itemOptions.length) {
    return null;
  }

  return (
    <div className="options-panel">
      <h3>Choose {selectedItem}</h3>

      <div className="options-list">
        {itemOptions.map((option, index) => (
          <button
            key={option.model || index}
            type="button"
            onClick={() => onAddItem(option)}
          >
            <img src={option.preview} alt={selectedItem} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
