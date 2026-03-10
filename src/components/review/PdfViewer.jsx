function PdfViewer({ statementId }) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) {
    return <p className="text-red-400">VITE_API_BASE_URL no configurado</p>;
  }
  const src = `${baseUrl}/statements/${statementId}/pdf`;

  return (
    <div className="h-full w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
      <iframe title="Estado de cuenta PDF" src={src} className="h-full w-full" />
    </div>
  );
}

export default PdfViewer;

