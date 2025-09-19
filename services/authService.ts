// services/authService.ts
import { storage } from '@/utils/storage';

const API_BASE_URL = 'http://localhost:4001';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    estado: number; // 1 para explorador, 2 para administrador
    nombre?: string;
  };
}

export interface ApiError {
  success: false;
  message: string;
  statusCode?: number;
}

/**
 * Realiza el login del usuario contra el backend
 */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error ${response.status}: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    // Si el login es exitoso, guarda el token y datos del usuario
    if (data.token) {
      await storage.setToken(data.token);
    }
    if (data.user) {
      await storage.setUserData(data.user);
    }

    return {
      success: true,
      token: data.token,
      user: data.user,
      message: data.message || 'Login exitoso',
    };

  } catch (error) {
    console.error('Error en loginUser:', error);
    return {
      success: false,
      message: 'Error de conexión. Verifica que el servidor esté ejecutándose en localhost:4001',
    };
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logoutUser = async (): Promise<void> => {
  try {
    // Eliminar datos del almacenamiento local
    await storage.clearAuthData();
    
    // Opcional: notificar al backend del logout
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.warn('Error al notificar logout al servidor');
    }
  } catch (error) {
    console.error('Error en logout:', error);
  }
};

/**
 * Obtiene el token almacenado
 */
export const getStoredToken = async (): Promise<string | null> => {
  try {
    return await storage.getToken();
  } catch (error) {
    console.error('Error obteniendo token:', error);
    return null;
  }
};

/**
 * Obtiene los datos del usuario almacenados
 */
export const getStoredUserData = async (): Promise<any | null> => {
  try {
    return await storage.getUserData();
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    return null;
  }
};

/**
 * Verifica si hay una sesión activa
 */
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const token = await getStoredToken();
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error verificando auth status:', error);
    return false;
  }
};