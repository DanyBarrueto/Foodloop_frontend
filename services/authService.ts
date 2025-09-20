// services/authService.ts
import { storage } from '@/utils/storage';

const API_BASE_URL = 'http://localhost:4001/foodloop';

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

// Tipos de registro (ajustables a tu backend)
export interface RegisterRequest {
  nombreEntidad: string; // entityName
  tipoEntidad: string;   // entityType
  email: string;
  telefono: string;      // phone
  ciudad?: string;       // location (preferido)
  ubicacion?: string;    // alias de ciudad
  direccion: string;     // address
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    estado: number;
    nombre?: string;
  };
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

/**
 * Realiza el login del usuario contra el backend
 */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse | ApiError> => {
  try {
  const response = await fetch(`${API_BASE_URL}/login`, {
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

    // Si el login es exitoso, normalizar y guardar token/usuario
    const normalizedUser = data.user ? { ...data.user, estado: Number(data.user.estado) } : undefined;
    if (data.token) {
      await storage.setToken(data.token);
    }
    if (normalizedUser) {
      await storage.setUserData(normalizedUser);
    }

    return {
      success: true,
      token: data.token,
      user: normalizedUser,
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

/**
 * Registra un usuario en el backend
 */
export const registerUser = async (payload: RegisterRequest): Promise<RegisterResponse | ApiError> => {
  try {
    // Ajusta la ruta según tu backend real
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        // asegurar ambos campos por compatibilidad
        ciudad: payload.ciudad ?? payload.ubicacion,
        ubicacion: payload.ubicacion ?? payload.ciudad,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error ${response.status}: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    const normalizedUser = data.user ? { ...data.user, estado: Number(data.user.estado) } : undefined;
    if (data.token) {
      await storage.setToken(data.token);
    }
    if (normalizedUser) {
      await storage.setUserData(normalizedUser);
    }

    return {
      success: true,
      token: data.token,
      user: normalizedUser,
      message: data.message || 'Registro exitoso',
    };
  } catch (error) {
    console.error('Error en registerUser:', error);
    return {
      success: false,
      message: 'Error de conexión. Verifica que el servidor esté ejecutándose en localhost:4001',
    };
  }
};

/**
 * Restablece la contraseña por email
 */
export const resetPassword = async (payload: ResetPasswordRequest): Promise<ResetPasswordResponse | ApiError> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error ${response.status}: ${response.statusText}`,
        statusCode: response.status,
      };
    }

    return { success: true, message: data.message || 'Contraseña actualizada correctamente' };
  } catch (error) {
    console.error('Error en resetPassword:', error);
    return {
      success: false,
      message: 'Error de conexión. Verifica que el servidor esté ejecutándose en localhost:4001',
    };
  }
};