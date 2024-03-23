import { useState } from "react"
import { post } from 'aws-amplify/api'
import { Button, Input, Link } from "@nextui-org/react";


function Home() {
  const [longUrl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const handle = async(e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const restOperation = post({
        apiName: 'urlshortenerapi',
        path: '/',
        options: {
          body: {
            long_url: longUrl
          }
        }
      });
  
      const { body } = await restOperation.response;
      const response = await body.json();
      const origin = window.location.href
      setShortUrl(origin+response.short_url)
      console.log(response)
    } catch (e) {
      console.log('POST call failed: ', e);
    }
    setLongUrl('');
    setLoading(false);
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-bold mb-3">URL Shortener</h1>
        <form onSubmit={handle} className="px-10 w-full flex justify-center items-center">
          <Input 
            className="max-w-lg mr-2 "
            type="url" 
            name="long_url" 
            id="long_url" 
            value={longUrl}
            disabled={loading}
            size="lg" 
            placeholder="Enter the url"
            onChange={(e) => setLongUrl(e.target.value)} 
            isRequired
          />
          <Button isLoading={loading} color="primary" type="submit">Submit</Button>
        </form>
        { 
          shortUrl &&  
          <div className="mt-3">
            <span className="mr-3">Copy the link</span>
            <Link href={shortUrl}>{shortUrl}</Link>
          </div>
        }
      </div>
    </>
  )
}

export default Home
