'use client';

import { useState, useEffect } from 'react';

interface TokenPayload {
  id: string;
  email: string;
  role: string;
  exp: number;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function decodeToken(token: string): TokenPayload | null {
  try {
    const json = atob(token);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Hook para extrair o corretor_id do cookie base64 token.
 * Retorna o UUID do corretor (não o token bruto).
 */
export function useCorretorId(): string {
  const [corretorId, setCorretorId] = useState<string>('');

  useEffect(() => {
    const token = getCookie('corretor_token');
    if (!token) return;

    const decoded = decodeToken(token);
    if (decoded?.id) {
      setCorretorId(decoded.id);
    }
  }, []);

  return corretorId;
}

/**
 * Decode token no lado do servidor (server component).
 * Usa Buffer.from em vez de atob.
 */
export function decodeCorretorTokenServer(token: string): TokenPayload | null {
  try {
    const json = Buffer.from(token, 'base64').toString('utf-8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Decode token no lado do cliente (browser).
 */
export function getCorretorIdFromCookie(): string {
  const token = getCookie('corretor_token');
  if (!token) return '';
  const decoded = decodeToken(token);
  return decoded?.id ?? '';
}
