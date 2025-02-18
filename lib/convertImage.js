import fetch from 'node-fetch'

const apiKey = '9byls2jMLKYKNFwk5nV1hZkkxJRy2FcS';

// Fungsi untuk mengonversi gambar menggunakan tinypng API
async function convertImageToFormat(imageUrl, targetFormat) {
  const apiUrl = 'https://api.tinify.com/shrink';
  const headers = {
    'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        source: {
          url: imageUrl,
        },
        format: targetFormat,
      }),
    });

    if (!response.ok) {
      throw new Error('Tinypng API request failed');
    }

    const responseData = await response.json();
    return responseData.output.url;
  } catch (error) {
    console.error('Error converting image:', error.message);
    return null;
  }
}

export default convertImageToFormat
