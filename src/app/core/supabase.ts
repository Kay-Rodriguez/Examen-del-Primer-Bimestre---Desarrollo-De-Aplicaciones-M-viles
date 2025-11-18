import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://jgspryrvyhfkiauidfoo.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnc3ByeXJ2eWhma2lhdWlkZm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzOTI5MTAsImV4cCI6MjA3ODk2ODkxMH0.b5dFwDxJ7tJLd_xWPtrMcTd1zhCNoBWN6spXBzWa2mQ'
    );
  }

  // ============================================================
  // 🔐 AUTENTICACIÓN
  // ============================================================

  async signUp(nombre: string, email: string, pass: string, telefono: string) {

    // Crear usuario
    const { data, error } = await this.supabase.auth.signUp({ email, password: pass });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error('No se pudo obtener el ID del usuario');

    // 🧠 Esperar medio segundo para que el trigger cree el perfil
    await new Promise(res => setTimeout(res, 500));

    // Actualizar perfil creado por el TRIGGER
    const { error: perfilErr } = await this.supabase
      .from('perfiles')
      .update({
        nombre_completo: nombre,
        telefono,
      })
      .eq('id', userId);

    if (perfilErr) throw perfilErr;

    return data;
  }

  async signIn(email: string, pass: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password: pass
    });
    if (error) throw error;
    return data;
  }

  async getUser() {
    return this.supabase.auth.getUser();
  }

  async getPerfilActual() {
    const { data: { user } } = await this.supabase.auth.getUser();
    if (!user) return null;

    const { data } = await this.supabase
      .from('perfiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return data;
  }

  logout() {
    return this.supabase.auth.signOut();
  }

  // ============================================================
  // 📦 PLANES (PÚBLICOS + ASESOR)
  // ============================================================

  async getPlanesPublicos() {
    const { data, error } = await this.supabase
      .from('planes_moviles')
      .select('*')
      .eq('activo', true)
      .order('id');

    if (error) throw error;
    return data;
  }

  async getPlanesPublicosAsesor() {
    const { data, error } = await this.supabase
      .from('planes_moviles')
      .select('*')
      .order('id');

    if (error) throw error;
    return data;
  }

  async crearPlan(plan: any) {
    const { error } = await this.supabase
      .from('planes_moviles')
      .insert(plan);

    if (error) throw error;
  }

  async editarPlan(id: number, plan: any) {
    const { error } = await this.supabase
      .from('planes_moviles')
      .update(plan)
      .eq('id', id);

    if (error) throw error;
  }

  async eliminarPlan(id: number) {
    const { error } = await this.supabase
      .from('planes_moviles')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // ============================================================
  // 📤 SUBIR IMAGEN AL STORAGE
  // ============================================================

  async uploadImage(file: File) {
    const name = `${Date.now()}.jpg`;

    const { error } = await this.supabase
      .storage
      .from('planes-imagenes')
      .upload(name, file);

    if (error) throw error;

    return this.supabase
      .storage
      .from('planes-imagenes')
      .getPublicUrl(name).data.publicUrl;
  }

  // ============================================================
  // 🧾 CONTRATACIONES
  // ============================================================

  async contratarPlan(planId: number) {
    const { data: { user } } = await this.supabase.auth.getUser();

    const { error } = await this.supabase
      .from('contrataciones')
      .insert({
        usuario_id: user?.id,
        plan_id: planId
      });

    if (error) throw error;
  }

  async misContratos() {
    const { data: { user } } = await this.supabase.auth.getUser();

    const { data, error } = await this.supabase
      .from('contrataciones')
      .select('*, planes_moviles(*)')
      .eq('usuario_id', user?.id);

    if (error) throw error;
    return data;
  }

  // ============================================================
  // 🧾 SOLICITUDES (ASESOR)
  // ============================================================

  async asesorSolicitudes() {
    const { data, error } = await this.supabase
      .from('contrataciones')
      .select(`
        *,
        perfiles (nombre_completo),
        planes_moviles (nombre, precio_mensual)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async cambiarEstado(id: number, estado: string) {
    const { error } = await this.supabase
      .from('contrataciones')
      .update({ estado })
      .eq('id', id);

    if (error) throw error;
  }

  // ============================================================
  // 💬 CHAT TIEMPO REAL
  // ============================================================

  async enviarMensaje(contratacion_id: number, texto: string) {
    const { data: { user } } = await this.supabase.auth.getUser();

    const { error } = await this.supabase
      .from('mensajes_chat')
      .insert({
        contratacion_id,
        mensaje: texto,
        emisor_id: user?.id
      });

    if (error) throw error;
  }

  async getMensajes(contratacionId: number) {
    const { data, error } = await this.supabase
      .from('mensajes_chat')
      .select('*')
      .eq('contratacion_id', contratacionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  escucharChat(contratacionId: number, callback: Function) {
    return this.supabase
      .channel('chat_room_' + contratacionId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes_chat',
          filter: `contratacion_id=eq.${contratacionId}`
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  }
  async obtenerMensajes(contratacion_id: number) {
    const { data, error } = await this.supabase
      .from('mensajes_chat')
      .select('*')
      .eq('contratacion_id', contratacion_id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async contratosAprobadosAsesor() {
    const { data, error } = await this.supabase
      .from('contrataciones')
      .select('*, planes_moviles(nombre), perfiles(nombre_completo)')
      .eq('estado', 'aprobado')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
async actualizarPerfil(perfil: any) {
  const { data: { user } } = await this.supabase.auth.getUser();

  const { error } = await this.supabase
    .from('perfiles')
    .update({
      nombre_completo: perfil.nombre_completo,
      telefono: perfil.telefono
    })
    .eq('id', user.id);

  if (error) throw error;
}

}
