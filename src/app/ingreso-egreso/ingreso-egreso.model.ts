export class IngresoEgreso {
    description: string;
    cantidad: number;
    tipo: string;
    uid?: string;

    constructor( obj ) {
        this.description = obj && obj.description || null;
        this.cantidad = obj && obj.cantidad || null;
        this.tipo = obj && obj.tipo || null;
        this.uid = obj && obj.uid || null;
    }
}
