export default function Select({ label, id, options, handleChange }) {
  return (
    <span className="select-menu-label">
      {label}
      <div className={`${id}-select`} name={id} id={id} onChange={handleChange}>
        {options.map((option) => (
          <div key={option} value={option}>
            {option}
          </div>
        ))}
      </div>
    </span>
  );
}
