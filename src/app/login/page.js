"use client";

import React from "react";

import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://xqibjfvprbmjrfuqebrz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxaWJqZnZwcmJtanJmdXFlYnJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5OTQ3MTgsImV4cCI6MjA0MzU3MDcxOH0.6ORGURy5TQCPXa3IEP_RepQuD_b5V2h2dTlJiNVJqoo"
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
