exports.handler = async function(event) {  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
  const TABLE = 'Listings';

  const method = event.httpMethod;
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE}`;

  const headers = {
    'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
    'Content-Type': 'application/json'
  };

  try {
    let response;

    if (method === 'GET') {
      const params = new URLSearchParams({
        filterByFormula: `{Status}='Approved'`
      });
      response = await fetch(`${url}?${params}`, { headers });
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body);
      response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};