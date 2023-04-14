import React, { Component } from 'react';


class Buscador extends React.Component {

    
    busquedaRef = React.createRef();

    //Es llamada desde el onSubmit para obtener los datos que introduzcan en el formulario
    obtenerDatos = (e) =>{
        e.preventDefault();
        console.log("Test");

        //Tomamos el valor del Input 
        const termino = this.busquedaRef.current.value

        //Enviamos el valor guardado termino y lo enviamos al componente principa;
        this.props.datosBusqueda(termino);
    }
    
    render() { 
        return (
            <form onSubmit={this.obtenerDatos}>
                <div className="row">
                    <div className="form-group col-md-10">
                        <input ref={this.busquedaRef} type="text" className="form-control form-control-lg" 
                            placeholder="Busca tu imagen. Ejemplo: Paisaje"/>
                    </div>
                    <div className="form-group col-md-2">
                        <input type="submit" className="btn btn-lg btn-danger btn-block" value="Buscar..."/>
                    </div>
                </div>
            </form>
        );
    }
}
 
export default Buscador;