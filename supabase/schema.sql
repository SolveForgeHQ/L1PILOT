-- ==============================================================================
-- L1Pilot - Supabase Database Schema & Bulletproof RLS Policies
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create Tables if they don't exist
CREATE TABLE IF NOT EXISTS public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New Conversation',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chat_id UUID REFERENCES public.chats(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('genesis', 'config')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Ensure default user_id = auth.uid() so inserts always match the session user
ALTER TABLE public.chats ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.messages ALTER COLUMN user_id SET DEFAULT auth.uid();
ALTER TABLE public.configurations ALTER COLUMN user_id SET DEFAULT auth.uid();

-- 3. Create Indexes
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON public.chats(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_configurations_user_id ON public.configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_configurations_chat_id ON public.configurations(chat_id);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurations ENABLE ROW LEVEL SECURITY;

-- 5. Grant schema permissions to the authenticated role
GRANT ALL ON public.chats TO authenticated;
GRANT ALL ON public.messages TO authenticated;
GRANT ALL ON public.configurations TO authenticated;

-- ==============================================================================
-- CLEAN & RECREATE RLS POLICIES (Idempotent: safe to run multiple times)
-- ==============================================================================

-- Drop old/conflicting policies
DROP POLICY IF EXISTS "Users can view their own chats" ON public.chats;
DROP POLICY IF EXISTS "Users can create their own chats" ON public.chats;
DROP POLICY IF EXISTS "Users can update their own chats" ON public.chats;
DROP POLICY IF EXISTS "Users can delete their own chats" ON public.chats;

DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can create their own messages" ON public.messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON public.messages;

DROP POLICY IF EXISTS "Users can view their own configurations" ON public.configurations;
DROP POLICY IF EXISTS "Users can create their own configurations" ON public.configurations;
DROP POLICY IF EXISTS "Users can update their own configurations" ON public.configurations;
DROP POLICY IF EXISTS "Users can delete their own configurations" ON public.configurations;

-- ------------------------------------------------------------------------------
-- Recreate Policies for `chats`
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own chats"
  ON public.chats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chats"
  ON public.chats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chats"
  ON public.chats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chats"
  ON public.chats FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Recreate Policies for `messages`
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages"
  ON public.messages FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Recreate Policies for `configurations`
-- ------------------------------------------------------------------------------
CREATE POLICY "Users can view their own configurations"
  ON public.configurations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own configurations"
  ON public.configurations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own configurations"
  ON public.configurations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own configurations"
  ON public.configurations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
