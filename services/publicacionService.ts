import { storage } from '@/utils/storage';
import { API_BASE_URL } from './authService';

export interface CreatePublicacionRequest {
  usuarioId: number;
  categoriaId: number;
  titulo: string;
  descripcion: string;
  // Acepta valores como 'donacion' | 'venta' | 'donation' | 'sale'
  tipo: string;
  cantidad?: string;
  precio?: number; // optional for sale only
  fechaCaducidad?: string; // ISO date string (YYYY-MM-DD)
}

export interface CreatePublicacionResponse {
  success: boolean;
  id?: number;
  message?: string;
  statusCode?: number;
}

export const createPublicacion = async (
  payload: CreatePublicacionRequest
): Promise<CreatePublicacionResponse> => {
  try {
    const token = await storage.getToken();
    if (!token) {
      return { success: false, message: 'No autenticado', statusCode: 401 };
    }

    const res = await fetch(`${API_BASE_URL}/publicaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || `Error ${res.status}: ${res.statusText}`,
        statusCode: res.status,
      };
    }

    return {
      success: true,
      id: Number(data?.id ?? 0),
      message: data?.message || 'Publicación creada',
    };
  } catch (err) {
    console.error('Error creando publicación:', err);
    return { success: false, message: 'Error de conexión con el servidor' };
  }
};
