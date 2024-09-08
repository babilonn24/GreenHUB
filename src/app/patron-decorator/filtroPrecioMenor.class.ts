import { decorador } from "./decorador.class";

export class filtroPrecioMenor extends decorador {
    
    override filtrado(): any {
        let listafiltrada = [];
        for(let elemento of super.filtrado()){
            if(elemento.precio<=this.filtros)
                listafiltrada.push(elemento)
        }
        return listafiltrada;
    }
}