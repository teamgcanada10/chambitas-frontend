// ==========================================
// API Configuration - Fuente Única de Verdad
// ==========================================

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Auth endpoints
export const AUTH_ENDPOINTS = {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    verifyEmail: '/auth/verify-email',
    resendVerification: '/auth/resend-verification',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
};

// Jobs endpoints
export const JOBS_ENDPOINTS = {
    list: '/jobs',
    completed: '/jobs/completed',
    latest: '/jobs/latest',
    create: '/jobs',
    detail: (id) => `/jobs/${id}`,
    update: (id) => `/jobs/${id}`,
    delete: (id) => `/jobs/${id}`,
};

// Profile endpoints
export const PROFILE_ENDPOINTS = {
    me: '/profile/me',
    update: '/profile',
    picture: '/profile/picture',
    switch: '/profile/switch',
};

// Admin endpoints
export const ADMIN_ENDPOINTS = {
    users: '/admin/users',
    userDetail: (id) => `/admin/users/${id}`,
    activate: (id) => `/admin/users/${id}/activate`,
    block: (id) => `/admin/users/${id}/block`,
    roles: (id) => `/admin/users/${id}/roles`,
    delete: (id) => `/admin/users/${id}`,
    seed: '/admin/seed',
};

// Full URL builders
export const buildUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// ==========================================
// Uso:
// import { buildUrl, JOBS_ENDPOINTS } from '@/config/api'
// const url = buildUrl(JOBS_ENDPOINTS.list)
// ==========================================
