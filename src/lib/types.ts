export type Repuesto = {
  id: string;
  nombre: string;
  descripcion?: string;
  precio: number;
  disponible?: boolean;
  categoria?: string; // ID de la categoría (relación)
  imagen?: string;
};

export type Categoria = {
  id: string;
  nombre: string;
};

export type RepuestoExpandido = Repuesto & {
  expand?: {
    categoria?: Categoria;
  };
};
