interface Props {
  title: string;

  value: number;

  color: string;
}

const StatsCard = ({
  title,
  value,
  color,
}: Props) => {
  return (
    <div
      className={`p-6 rounded-2xl shadow-md text-white ${color}`}
    >
      <h3 className="text-lg font-medium">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-3">
        {value}
      </p>
    </div>
  );
};

export default StatsCard;