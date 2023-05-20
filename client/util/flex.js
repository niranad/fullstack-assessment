export default function flex(
  flexDirection = 'row',
  justifyContent,
  alignItems,
  gap = '0.5rem',
) {
  return {
    display: 'flex',
    flexDirection,
    justifyContent,
    alignItems,
    gap,
  };
}
