"use client";

import React from "react";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center duration-200">
      <h1 className="text-3xl my-4">Please Sign In</h1>
      <div className="w-1/2">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={null}
        />
      </div>
    </div>
  );
}
