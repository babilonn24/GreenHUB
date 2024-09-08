import { Strategy } from "./strategy.interface";

export class Context {

    private strategy: Strategy|null = null;

    constructor() {
    }

    setStrategy(strategy: Strategy):void{
        this.strategy = strategy;
    }

    orden(productos:any):any{
        return this.strategy?.ordenar(productos);
    }
}