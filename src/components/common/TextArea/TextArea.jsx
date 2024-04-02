export default function TextArea({ className, label }) {
  return (
    <label>
      {label}
      <textarea className={className}></textarea>
    </label>
  );
}
