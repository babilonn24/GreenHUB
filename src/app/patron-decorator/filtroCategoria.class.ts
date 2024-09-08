import { decorador } from "./decorador.class";

export class filtroCategoria extends decorador {
    
    override filtrado(): any {
        let listafiltrada = [];
        for(let elemento of super.filtrado()){
            if(elemento.categoria==this.filtros)
                listafiltrada.push(elemento)
        }
        return listafiltrada;
    }
}