import React,{ useEffect, useState } from "react";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'
import FeatureadMovie from "./components/FeatureadMovie"

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setfeaturedData] = useState({})


  useEffect(() => {
    const loadAll = async () => {
      // pegando a lista TOTAL 
      let list = await tmdb.getHomeList();
      setMovieList(list)

      // pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await tmdb.getMovieInfo(chosen.id,'tv')
      setfeaturedData(chosenInfo)
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {<featuredData/> &&
      <FeatureadMovie item={featuredData} />
      }
      

      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}