export default function VersionHistory({ versions = [] }) {
  if (!versions.length) return null;
  return (
    <div className="mt-8 bg-white rounded shadow p-4">
      <h3 className="text-lg font-semibold mb-3">old chnages</h3>
      <ul className="space-y-2 text-sm">
        {versions.map((v) => (
          <li
            key={v.id}
            className="flex justify-between border-b last:border-b-0 pb-1"
          >
            <span className="font-medium">{v.title}</span>
            <span className="text-gray-500">
              {new Date(v.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}