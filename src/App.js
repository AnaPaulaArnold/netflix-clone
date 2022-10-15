import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from "./Tmdb";
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import MovieRow from './components/MovieRow';

export default () => {
    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData]= useState(null);
    const [blackHeader, setBlackHeader]= useState(false);



    useEffect(()=>{
        const loadAll = async () =>{
            // Pegando a lista TOTAL
            let list = await Tmdb.getHomeList();
            setMovieList(list);
            
            // Pegando o featured
            let originals = list.filter(i=> i.slug ==='originals');
            let randomChosen =  Math.floor(Math.random() * (originals[0].items.results.length - 1 ));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo= await Tmdb.getMovieInfo(chosen.id, 'tv');

            setFeaturedData(chosenInfo);
        }
    loadAll();
    },[]);

    //Monitorando Scroll da page
    useEffect(()=>{
        const scrollListener = () =>{
            

            if (window.scrollY > 100){
                setBlackHeader(true);
            }else{
                setBlackHeader(false);
            }
        }
        window.addEventListener('scroll', scrollListener);

        return() =>{
            window.removeEventListener('scroll', scrollListener);
        }

    }, []);



    return (
        <div className="page">

            <Header black={blackHeader}/> 
           

           {featuredData && <FeaturedMovie item={featuredData} /> }


           <section className="lists">
            {movieList.map((item, key )=>(
                <div>
                    <MovieRow key={key} title={item.title} items={item.items} />
                </div>
            ))}
           </section>
           <footer>
            Feito com <span role="img" aria-label="coração">💖</span> por Ana Arnold. <br/>
            Direitos de imagem para Netflix. <br/>
            Dados fornecidos pelo site Themoviedb.org
           </footer>
                {movieList.length <= 0 && 
                <div className="loading">
                    <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando..." />
                </div>
                }

        </div>

    );
}