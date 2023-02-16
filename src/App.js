import './App.css';
import React, { Component } from 'react'
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class  App extends React.Component {


  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }
  

  paginaSiguiente = () =>{
    //Leer el state de la pagina actual
    let pagina = this.state.pagina;

    //Sumar 1 al State Actual
    pagina += 1;
    

    //Agregarr cambio al State
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    })

    console.log(pagina);
  }

  paginaAnterior = () =>{
    //Leer state de la pagina actual
    let pagina = this.state.pagina;


    //Validar si la pagina es 1 devolver null
    if(pagina === 1 ) return null;

    //Restar 1 a la pagina actual
    pagina -= 1;

    //Agregar cambio al State
    this.setState({
      pagina
    }, ()=> {
      this.consultarApi();
      this.scroll();
    })
    console.log(pagina)
  }

  consultarApi = () =>{
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=24359434-0f731b848c85bb77e34871aa6&q=${termino}&per_page=20&page=${pagina}`;

    fetch(url)
    .then(respuesta => respuesta.json() )
    .then(resultado => this.setState({imagenes: resultado.hits}) )
  }
  //Esta funcion es llamada desde el Buscador el cual le pasa los datos del input
  datosBusqueda = (termino) =>{
    this.setState({
      termino: termino,
      pagina: 1
    }, () =>{
      this.consultarApi();
    } )
  }

  


  render() { 
    return (
      <div className="app container">
            <div className="jumbotron">
                <p className="lead text-center">Buscador De Imágenes</p>

                {/* Se llama al componente y se le pasa un valor con una funcion */}
                <Buscador 
                    datosBusqueda = {this.datosBusqueda} />
            </div>

            <div className="row justify-content-center">
              <Resultado 
                imagenes = {this.state.imagenes} 
                paginaAnterior = {this.paginaAnterior}
                paginaSiguiente = {this.paginaSiguiente}/>
              
            </div>  

      </div>
    );
  }
}
 
export default App;
