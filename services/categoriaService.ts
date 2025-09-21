import { storage } from '@/utils/storage';
import { API_BASE_URL } from './authService';

export interface CategoriaItem {
  id: number;
  nombre: string;
  descripcion?: string;
  estado?: number;
}

/**
 * Obtiene la lista de categorías desde el backend.
 * Requiere token (el endpoint está protegido).
 */
export const getCategorias = async (): Promise<CategoriaItem[]> => {
  try {
    const token = await storage.getToken();
  const url = `${API_BASE_URL}/categorias`;
  const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      console.warn('getCategorias: respuesta no OK', res.status, 'URL:', url);
      return [];
    }

    const data = await res.json();
    if (!Array.isArray(data)) return [];

    // Normalizar y quedarnos sólo con id y nombre, filtrando inactivas si aplica
    return data
      .filter((c: any) => c && (c.estado === undefined || c.estado === 1))
      .map((c: any) => ({ id: Number(c.id ?? c.id_categoria ?? 0), nombre: String(c.nombre ?? '') }));
  } catch (err) {
    console.error('Error en getCategorias:', err, 'URL:', `${API_BASE_URL}/categorias`);
    return [];
  }
};
