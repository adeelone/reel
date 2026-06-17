import { getSnapshot, importLibrarySnapshot } from '../repo/libraryStore';

const syncEnabled = import.meta.env.VITE_SYNC_ENABLED === 'true';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const userKey = 'reel.sync.userId';

export function syncStatus() {
  if (!syncEnabled) return 'Sync disabled';
  if (!supabaseUrl || !supabaseKey) return 'Set Supabase URL and anon key';
  return 'Ready';
}

export async function pushLibrarySnapshot() {
  const userId = localStorage.getItem(userKey) ?? crypto.randomUUID();
  localStorage.setItem(userKey, userId);
  const payload = { user_id: userId, payload: getSnapshot(), updated_at: new Date().toISOString() };
  await supabaseRequest('/rest/v1/library_snapshots', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify(payload),
  });
  return userId;
}

export async function pullLibrarySnapshot() {
  const userId = localStorage.getItem(userKey);
  if (!userId) return false;
  const rows = await supabaseRequest<Array<{ payload: unknown }>>(
    `/rest/v1/library_snapshots?user_id=eq.${encodeURIComponent(userId)}&select=payload&limit=1`,
  );
  if (!rows[0]?.payload) return false;
  importLibrarySnapshot(rows[0].payload as Parameters<typeof importLibrarySnapshot>[0]);
  return true;
}

export async function deleteRemoteLibrary() {
  const userId = localStorage.getItem(userKey);
  if (!userId) return;
  await supabaseRequest(`/rest/v1/library_snapshots?user_id=eq.${encodeURIComponent(userId)}`, { method: 'DELETE' });
}

async function supabaseRequest<T = unknown>(path: string, init: RequestInit = {}) {
  if (!syncEnabled || !supabaseUrl || !supabaseKey) {
    throw new Error('Supabase sync is not configured');
  }

  const response = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      apikey: supabaseKey,
      Authorization: ['Bearer', supabaseKey].join(' '),
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) throw new Error(`Supabase sync failed: ${response.status}`);
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
