import React,{ useEffect, useState } from "react";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import './App.css'
import FeatureadMovie from "./components/FeaturedMovie/FeatureadMovie"
import Header from "./components/Header/Header";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setfeaturedData] = useState({})
  const [blackHeader,setBlackHeader] = useState(false)


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

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }
      else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }
  },[])


  // Page
  return (
    <div className="page">

      <Header black={blackHeader}/>

      {<featuredData/> &&
      <FeatureadMovie item={featuredData} />
      }
      

      <section className="lists">
        {movieList.map((item,key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
          feito com <span role="img" aria-label="coração">❤️</span> pelo https://github.com/Jonathansoare<br/>
          Direitos de imagem para netflix<br/>
          Dados pego do site Themoviedb.org
    </footer>

    </div>
  );
}