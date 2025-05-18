export interface RateParamType {
  count: number;
  rating: number;
  color: {
    filled: string;
    unfilled: string;
  };
  onRating: Function;
}
