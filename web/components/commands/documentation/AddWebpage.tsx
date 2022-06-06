import axios from "axios"
import { useEffect, useState } from "react"
import { API_ENDPOINT } from "../../../helpers/api"

const isUrlValid = (str: string): boolean => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$", // fragment locator
    "i"
  )
  return !!pattern.test(str)
}

export default function AddWebpage({value, setValue}: { value: string, setValue: (url: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [favicon, setFavicon] = useState();

  useEffect(() => {
    if (!isUrlValid(value)) {
      setIsLoading(false);
      setFavicon(undefined);
      return;
    }

    setIsLoading(true);
    axios.get(`${API_ENDPOINT}/routes/docs/preview`, {
      params: {
        url: value
      }
    }).then(({ data }) => {
      setIsLoading(false);
      const { title, favicon } = data;
      setFavicon(favicon);
    })
  }, [value])
  return <div className="relative rounded-md shadow-sm">
  <input
    type="url"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    name="company-website"
    id="company-website"
    className="focus:ring-primary focus:border-primary block w-full pl-3 pr-8 sm:text-sm border-gray-300 rounded-md"
    placeholder="https://example.com/docs"
    autoFocus
  />
  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
    {
      isLoading && <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 animate-spin" viewBox="0 0 512 512" fill="currentColor">
      <path d="M304 48C304 74.51 282.5 96 256 96C229.5 96 208 74.51 208 48C208 21.49 229.5 0 256 0C282.5 0 304 21.49 304 48zM304 464C304 490.5 282.5 512 256 512C229.5 512 208 490.5 208 464C208 437.5 229.5 416 256 416C282.5 416 304 437.5 304 464zM0 256C0 229.5 21.49 208 48 208C74.51 208 96 229.5 96 256C96 282.5 74.51 304 48 304C21.49 304 0 282.5 0 256zM512 256C512 282.5 490.5 304 464 304C437.5 304 416 282.5 416 256C416 229.5 437.5 208 464 208C490.5 208 512 229.5 512 256zM74.98 437C56.23 418.3 56.23 387.9 74.98 369.1C93.73 350.4 124.1 350.4 142.9 369.1C161.6 387.9 161.6 418.3 142.9 437C124.1 455.8 93.73 455.8 74.98 437V437zM142.9 142.9C124.1 161.6 93.73 161.6 74.98 142.9C56.24 124.1 56.24 93.73 74.98 74.98C93.73 56.23 124.1 56.23 142.9 74.98C161.6 93.73 161.6 124.1 142.9 142.9zM369.1 369.1C387.9 350.4 418.3 350.4 437 369.1C455.8 387.9 455.8 418.3 437 437C418.3 455.8 387.9 455.8 369.1 437C350.4 418.3 350.4 387.9 369.1 369.1V369.1z"/>
    </svg>
    }
    {
      !isLoading && favicon && <img className="h-4 w-4" src={favicon} alt="Favicon of result" />
    }
  </div>
</div>
}