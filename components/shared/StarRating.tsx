import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({ rating, reviewCount, size = 14 }: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
      <div className="star-rating">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#f59e0b" stroke="none" />
        ))}
        {hasHalf && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <Star size={size} fill="#e5e7eb" stroke="none" />
            <div style={{ position: "absolute", top: 0, left: 0, overflow: "hidden", width: "50%" }}>
              <Star size={size} fill="#f59e0b" stroke="none" />
            </div>
          </div>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} fill="#e5e7eb" stroke="none" />
        ))}
      </div>
      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#374151" }}>{rating.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
