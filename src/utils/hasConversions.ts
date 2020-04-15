export default function hasConversions(conversions: number[]): boolean {
  for (let i = 0; i < conversions.length; i += 1) {
    if (conversions[i] > 0) {
      return true;
    }
  }
  return false;
}
