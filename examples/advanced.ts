import { createClient } from "../src/api/client";
const c = createClient({ baseUrl: "https://api.example.internal" });
void c;
