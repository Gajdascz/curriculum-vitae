export default function ListBuilder({
  type = 'ul',
  initialEntries = [],
  className = ''
} = {}) {
  const ListType = ['ul', 'ol'].includes(type) ? type : 'ul';
  return (
    <ListType className={className}>
      {entries.map((entry) => (
        <li key={entry.key}>{entry.text}</li>
      ))}
    </ListType>
  );
}
