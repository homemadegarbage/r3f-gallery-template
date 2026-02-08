export default function Modal({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)] ">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-lg max-h-full overflow-y-auto overflow-x-hidden relative">
        <button className="absolute top-3 right-3 text-xl text-gray-500 hover:text-black" onClick={onClose}>
          ✕
        </button>

        <h2 className="text-xl font-bold mb-3">{data.title}</h2>

        {data.image && <img src={data.image} className="mb-3 rounded w-full" />}

        <p className="mb-3">{data.description}</p>

        {data.video && <iframe width="100%" height="250" src={data.video} allowFullScreen />}

        {data.link && (
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline mt-3 block">
            🔗 View Project
          </a>
        )}
      </div>
    </div>
  );
}
