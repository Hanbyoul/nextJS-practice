export default function Time(req, res) {
  const now = new Date();
  const currentTime = now.toLocaleString();

  return res.status(200).json(currentTime);
}
