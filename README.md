# Examen-del-Primer-Bimestre---Desarrollo-De-Aplicaciones-M-viles
Tigo Conecta — Aplicación Móvil (Ionic + Angular + Supabase)
Escenario: Tras la adquisición de Movistar Ecuador por parte de TIGO, se desarrolla la app Tigo Conecta para gestionar planes móviles, atención por chat, registro y contratación.

🚀 Tecnologías Usadas
| Módulo        | Tecnología           |
| ------------- | -------------------- |
| Frontend      | Ionic 7 + Angular 17 |
| Backend       | Supabase             |
| Auth          | Supabase Auth        |
| DB            | PostgreSQL + RLS     |
| Storage       | Supabase Storage     |
| Real Time     | Supabase Realtime    |
| Build Android | Capacitor 6          |

#👥 Roles del Sistema

1️ Usuario Invitado (Público

Ver catálogo de planes
Ver detalle de planes
No puede chatear
No puede contratar

2️ Usuario Registrado

Ver catálogo
Contratar planes
Chat en tiempo real
Historial de contrataciones
Editar perfil

3️ Asesor Comercial

CRUD completo de planes móviles
Subir imágenes al bucket
Ver solicitudes de contratación
Aprobar / rechazar
Chat en tiempo real con clientes

#🛢 Base de Datos – Supabase (SQL usado en este proyecto)

Tabla perfiles 
create table perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre_completo text,
  telefono text,
  rol text check (rol in ('asesor_comercial','usuario_registrado')) not null default 'usuario_registrado',
  created_at timestamptz default now()
);

Incluye:
RLS activado
Políticas: lectura y actualización solo propia
Trigger automático al crear usuario

Tabla planes_moviles (CRUD para asesores, lectura para usuarios)
Incluye políticas:
Asesores: CRUD completo
Público: solo lectura de planes activos

Tabla contrataciones (solicitudes de usuarios)
Inserta usuario registrado
Asesor ve todas
Asesor actualiza estado
Usuario solo ve las suyas

Tabla mensajes_chat (chat en tiempo real)
Políticas:
Insert: cada usuario solo puede enviar sus propios mensajes
Select: participantes + asesores pueden leer

# Supabase Storage

Bucket: planes-imagenes

✔ Lectura pública
✔ Insert solo para asesores
✔ Máx 5 MB
✔ JPG / PNG

const url = await this.supabase
  .storage
  .from('planes-imagenes')
  .upload(name, file);

💬 Chat en Tiempo Real

Implementado con:

escucharChat(id, callback) {
  return this.supabase
    .channel('chat_room_'+id)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'mensajes_chat',
      filter: `contratacion_id=eq.${id}`
    }, (payload) => callback(payload.new))
    .subscribe();
}

 Pantallas del Sistema
Público

Welcome

<img width="1351" height="592" alt="image" src="https://github.com/user-attachments/assets/24699e94-1449-4cf2-ad2e-1b62f36853ff" />

Catálogo público

<img width="419" height="521" alt="image" src="https://github.com/user-attachments/assets/9b41b6ae-fbfd-4f13-aa2c-19a4bec3ecd1" />

Detalle de plan

<img width="338" height="478" alt="image" src="https://github.com/user-attachments/assets/766bfac6-10e0-4e45-943b-db8213f78c8c" />

Login

<img width="1058" height="386" alt="image" src="https://github.com/user-attachments/assets/1aed7846-9ef3-4a54-8499-c8ba01c3d11e" />

Registro

<img width="1364" height="482" alt="image" src="https://github.com/user-attachments/assets/241b5f6e-44c8-45aa-9fed-afca5e4ec190" />

Home (catálogo activo)

![Imagen de WhatsApp 2025-11-19 a las 16 39 16_9c5241a2](https://github.com/user-attachments/assets/e5ce3079-b44a-42d6-a683-7006fc40f754)

Mis Contratos
![Imagen de WhatsApp 2025-11-19 a las 16 39 16_1cf413a0](https://github.com/user-attachments/assets/b70b502e-ac76-40b4-9919-45f82a4f9d53)

Chat con asesor
![Imagen de WhatsApp 2025-11-19 a las 16 39 16_768af6b4](https://github.com/user-attachments/assets/afdeff23-8107-4d82-83ee-5f8d3feeb1f5)

Perfil

![Imagen de WhatsApp 2025-11-19 a las 16 39 16_947f4aa5](https://github.com/user-attachments/assets/543fbc29-2705-424e-ba46-eb48445d7b10)

Dashboard (CRUD planes)

![Imagen de WhatsApp 2025-11-19 a las 16 39 16_e4b01a1c](https://github.com/user-attachments/assets/fef3a070-410e-4826-a4ad-65f6b5c55df5)

Chats con clientes

![Imagen de WhatsApp 2025-11-19 a las 16 39 16_e7d784b4](https://github.com/user-attachments/assets/74e74e35-01f6-49c2-b702-a9e2f7c773a4)

