import { useParams } from 'react-router-dom';
import { get } from 'aws-amplify/api';
import { useEffect } from 'react';

export default function ShortUrl() {
  const { short_url } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const restOperation = get({
          apiName: 'urlshortenerapi',
          path: '/',
          options: {
            queryParams: {
              short_url: short_url
            }
          }
        });
        const response = await restOperation.response;
        // window.location.replace(body.url);
        const body = await response.body.json()
        console.log(body)
        location.replace(body.url)
        // window.location.replace(body.url)
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchUrl();
  }, [short_url]);

  return (
    <div>redirecting...</div>
  );
}
