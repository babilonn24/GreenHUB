import {filtro } from "./filtro.interface";

export class filtroBase implements filtro {
    
    constructor(private lista:any) {
    }

    public filtrado(): any {
        return this.lista;
    }
}
