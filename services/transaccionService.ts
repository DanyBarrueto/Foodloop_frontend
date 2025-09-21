import { storage } from '@/utils/storage';
import { API_BASE_URL } from './authService';

export interface CreateTransaccionRequest {
  publicacionId: number;
  donanteVendedorId: number; // owner of the post
  beneficiarioCompradorId: number; // requester (current user)
  // optional client fields (not persisted in backend schema yet), sent under meta
  meta?: {
    deliveryPreference?: string;
    timePreference?: string;
    economicSituation?: string;
    message?: string;
    termsAccepted?: boolean;
    quantityDesired?: string;
    budget?: string;
    paymentMethod?: 'cash' | 'card';
  };
  fechaTransaccion?: string | Date; // optional
}

export interface CreateTransaccionResponse {
  success: boolean;
  id?: number;
  message?: string;
  statusCode?: number;
}

export const createTransaccion = async (
  payload: CreateTransaccionRequest
): Promise<CreateTransaccionResponse> => {
  try {
    const token = await storage.getToken();
    if (!token) {
      return { success: false, message: 'No autenticado', statusCode: 401 };
    }

    const res = await fetch(`${API_BASE_URL}/transacciones`, {
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

    return { success: true, id: Number(data?.id ?? 0), message: data?.message || 'Transacción creada' };
  } catch (err) {
    console.error('Error creando transacción:', err);
    return { success: false, message: 'Error de conexión con el servidor' };
  }
};
