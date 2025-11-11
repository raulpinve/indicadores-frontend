const Table = ({ children, className = "" }) => {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg">
          <table
            className={`min-w-full divide-y divide-gray-200 text-sm ${className}`}
          >
            {children}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
