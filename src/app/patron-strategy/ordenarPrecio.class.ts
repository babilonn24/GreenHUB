import { Strategy } from "./strategy.interface";

export class ordenarPrecio implements Strategy {

    ordenar(productos: any): any{
        for(var i = 0;i<productos.length;i++){
            for(var j = 0;j<productos.length;j++){
                var productoAlmacenado= productos[j];
                if(productos[i].precio-productos[i].descuento*productos[i].precio/100<productos[j].precio-productos[j].descuento*productos[j].precio/100){
                    productos[j]=productos[i];
                    productos[i]=productoAlmacenado;
                }
            }
        }
        return productos
    }
}