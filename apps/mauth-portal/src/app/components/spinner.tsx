export function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-15 w-15 animate-spin rounded-full border-6 border-solid border-lavender border-t-transparent`}
        role="status"
      >
        <span className="sr-only">Cargando...</span>
      </div>
    </div>
  );
};
