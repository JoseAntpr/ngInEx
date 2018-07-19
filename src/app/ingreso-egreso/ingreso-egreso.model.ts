export class IngresoEgreso {
    descripcion: string;
    cantidad: number;
    tipo: string;
    uid?: string;

    constructor( obj ) {
        this.descripcion = obj && obj.descripcion || null;
        this.cantidad = obj && obj.cantidad || null;
        this.tipo = obj && obj.tipo || null;
        // this.uid = obj && obj.uid || null;
    }
}
