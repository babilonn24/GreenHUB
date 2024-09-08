import { Strategy } from "./strategy.interface";

export class ordenarNombre implements Strategy {
    
    ordenar(productos: any): any{
        for(var i = 0;i<productos.length;i++){
            for(var j = 0;j<productos.length;j++){
                var productoAlmacenado= productos[j];
                if(productos[i].nombre.toLowerCase()<productos[j].nombre.toLowerCase()){
                    productos[j]=productos[i];
                    productos[i]=productoAlmacenado;
                }
            }
        }
        return productos
    }
}