const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export function fetchConfig() {
  return request('/api/config');
}

export function submitEstimate(payload) {
  return request('/api/estimate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function login(username, password) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function logout() {
  return request('/api/auth/logout', { method: 'POST' });
}

export function fetchSession() {
  return request('/api/auth/session');
}

export function updateConfig(payload) {
  return request('/api/admin/config', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

// 🟢 FIX: saveConfig ko bhi export kar diya hai taaki OwnerPanel crash na ho
export function saveConfig(payload) {
  return updateConfig(payload);
}

export function fetchLeads() {
  return request('/api/admin/leads');
}

export function updateLeadStatus(id, status) {
  return request(`/api/admin/leads/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteLead(id) {
  return request(`/api/admin/leads/${id}`, {
    method: 'DELETE',
  });
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}