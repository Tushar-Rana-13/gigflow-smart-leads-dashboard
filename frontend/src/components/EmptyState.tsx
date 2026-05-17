const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-gray-500">
      <h2 className="text-2xl font-semibold mb-2">
        No Leads Found
      </h2>

      <p>
        Try creating a lead or changing filters
      </p>
    </div>
  );
};

export default EmptyState;