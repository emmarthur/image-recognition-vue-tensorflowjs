/** One MobileNet prediction: label and confidence in 0–1 (book lists className + probability). */
export interface TensorInformation {
  className: string;
  probability: number;
}
