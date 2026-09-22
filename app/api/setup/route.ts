import { sql } from '@vercel/postgres'
export async function GET(){
  await sql`create table if not exists transactions (id uuid default gen_random_uuid() primary key, user_id text, type text, from_currency text, to_currency text, amount numeric, rate numeric, status text default 'SUCCESS', created_at timestamp default now())`;
  await sql`create table if not exists rates (id uuid default gen_random_uuid() primary key, pair text unique, rate numeric, updated_at timestamp default now())`;
  await sql`insert into rates (pair, rate) values ('XAF/PI', 650), ('XOF/PI', 650), ('USD/PI', 1), ('EUR/PI', 0.92), ('JOD/PI', 0.71) on conflict (pair) do nothing`;
  return Response.json({ok:true, msg:'Tables Gargoura créées! CEMAC UEMOA USD EUR JOD OK!'})
}
