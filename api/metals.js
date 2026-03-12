export default async function handler(req, res) {
  const { metal } = req.query
  const response = await fetch(`https://www.goldapi.io/api/${metal}/EUR`, {
    headers: { 'x-access-token': 'goldapi-excsmmc04npn-io' },
  })
  const data = await response.json()
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json(data)
}
