export default function Section({ name, children }) {
  return <section className={`${name}-section`}>{children}</section>;
}
