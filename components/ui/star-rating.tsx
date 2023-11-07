import Star from "./star";

export type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} filled className="w-4 h-4 mr-1" />
      ))}
    </div>
  );
}