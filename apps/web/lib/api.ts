const base=process.env.NEXT_PUBLIC_API_BASE_URL??'http://localhost:4000/api/v1';
export async function api<T>(path:string,init:RequestInit={}){const res=await fetch(base+path,{...init,headers:{'Content-Type':'application/json',...(init.headers??{})},cache:'no-store'});const json=await res.json();if(!res.ok)throw new Error(json?.error?.message??'Request failed');return json.data as T;}
