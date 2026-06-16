type RatingControlProps = {
  value?: number;
  onChange: (value: number) => void;
};

export function RatingControl({ value = 0, onChange }: RatingControlProps) {
  return (
    <fieldset className="rating-control">
      <legend>Rate this title</legend>
      {Array.from({ length: 10 }, (_, index) => index + 1).map((rating) => (
        <button
          key={rating}
          type="button"
          className={rating <= value ? 'selected' : ''}
          onClick={() => onChange(rating)}
          aria-label={`${rating} out of 10`}
        >
          {rating}
        </button>
      ))}
    </fieldset>
  );
}
