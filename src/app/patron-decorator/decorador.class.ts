import { filtro } from "./filtro.interface";

export class decorador implements filtro {
    
    protected fil: filtro
    protected filtros: any
    
    constructor(fil: filtro , filtros:any) {
        this.fil = fil;
        this.filtros = filtros;
    }

    public filtrado(): any {
        return this.fil.filtrado();
    }
}