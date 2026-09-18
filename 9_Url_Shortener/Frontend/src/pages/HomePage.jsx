import React from "react";
import { useState } from "react";
import UrlShortener from "../components/UrlShortener";
import ShortUrlResult from "../components/ShortUrlResult";
import UrlHistory from "../components/UrlHistory";
import { urlService } from "../services/urlApi";
import { useEffect } from "react";

const Home = () => {
  const [url, setUrl] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllUrls = async () => {
    try {
      const res = await urlService.getAll();
      setUrl(res.data.urls);
    } catch (error) {
      console.log("Faild to load Urls, error in fetchAllUrls Api", error);
    }
  };

  useEffect(() => {
    fetchAllUrls();
  }, []);

  const handleShorten = async (longUrl) => {
    setLoading(true);
    try {
      const res = await urlService.shorten(longUrl);
      setResult(res.data);
      fetchAllUrls();
    } catch (error) {
      console.log("Error Shortening Url");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await urlService.remove(id);
      setUrl((prev) => prev.filter((item) => item._id !== id));

      if (result && result._id === id) {
        setResult(null);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pb-20">
      <UrlShortener onShorten={handleShorten} loading={loading} />
      {result && <ShortUrlResult result={result} />}
      <UrlHistory urls={url} onDelete={handleDelete} />
    </main>
  );
};

export default Home;
