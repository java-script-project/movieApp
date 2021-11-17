import React, { Component } from "react";
// import { movies } from "./movies";
import axios from 'axios';

class List extends Component {
  constructor() {
    super();
    this.state = {
      currentBtn: "",
      parr : [1],
      currpage: 1,
      movies:[]
    };
  }

  
  async componentDidMount(){
    await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=3046211f9c9289f5dc188ca2e1f0d1f4&language=en-US&page=${this.state.currpage}`).
    then((res) =>{
      this.setState({movies: [...res.data.results]});
    }).
    catch((err)=>{
      console.log(err)
    })
  }
  
  changeMovies = async()=>{
    await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=3046211f9c9289f5dc188ca2e1f0d1f4&language=en-US&page=${this.state.currpage}`).
    then((res) =>{
      this.setState({movies: [...res.data.results]});
    }).
    catch((err)=>{
      console.log(err)
    })
  }

  handleRight = ()=>{
    let currpage = this.state.currpage;
    if(!this.state.parr.includes(currpage + 1)){
      this.state.parr.push(currpage + 1)
    }
    this.setState({currpage:currpage + 1} , this.changeMovies)
  }

  handleLeft = ()=>{
    let currpage = this.state.currpage
    if(currpage > 1){
      this.setState({currpage:currpage -1}, this.changeMovies)
    }
  }

  handlepagClick = (value) =>{
    if(value != this.state.currpage){
      this.setState({
        currpage: value
      } , this.changeMovies)
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <h1 id="trending" className="text-center py-3">Trending</h1>
          <div className="container d-flex flex-wrap justify-content-around">
            {this.state.movies.length === 0 ? (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              this.state.movies.map((movie) => {
                return (
                  <div
                    className="card my-4 moviesCard"
                    onMouseEnter = {()=>this.setState({currentBtn: movie.id})}
                    onMouseLeave = {()=>this.setState({currentBtn:""})}
                    style={imgStyle}
                    key={movie.id}
                  >
                    <img
                      className="card-img-top"
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt="Card"
                    />
                    {/* <h5 className="card-title text-center ">{movie.title}</h5> */}

                    {
                        this.state.currentBtn === movie.id &&
                        <a
                        href="#"
                        id={movie.id}
                        key={movie.id}
                        className="btn btn-primary w-75 bg-dark movie-btn "
                        >
                        Add To Favourites
                        </a>

                    }
                  </div>
                );
              })
            )}
          </div>
          <nav aria-label="Page navigation example my-10">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="#trending" onClick={this.handleLeft}>
                  Previous
                </a>
              </li>

                {
                    this.state.parr.map((value)=>
                    {
                      return(
                        <li className="page-item" key={value} >
                            <a className="page-link" href="#trending" onClick={()=>{this.handlepagClick(value)}}>
                            {value}
                            </a>
                        </li>
                      )
                    })
                }
              <li className="page-item">
                <a className="page-link" href="#trending" onClick={this.handleRight}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

let imgStyle = {
  width: "18rem",
};




export default List;
