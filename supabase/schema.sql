-- Chartly Database Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- User stats (XP, level, streak)
CREATE TABLE IF NOT EXISTS user_stats (
  user_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  total_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak_days INTEGER DEFAULT 0,
  last_active TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- XP events log
CREATE TABLE IF NOT EXISTS xp_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user_stats(user_id),
  amount INTEGER NOT NULL,
  source TEXT NOT NULL, -- 'lesson', 'quest', 'badge'
  source_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lesson completion tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user_stats(user_id),
  course_slug TEXT NOT NULL,
  lesson_slug TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_slug, lesson_slug)
);

-- Badges earned
CREATE TABLE IF NOT EXISTS badges_earned (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user_stats(user_id),
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_xp_events_user ON xp_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stats_xp ON user_stats(total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_badges_earned_user ON badges_earned(user_id);

-- Row Level Security
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges_earned ENABLE ROW LEVEL SECURITY;

-- Policies: users can read all stats (leaderboard) but only write their own
CREATE POLICY "Anyone can view stats" ON user_stats FOR SELECT USING (true);
CREATE POLICY "Users manage own stats" ON user_stats FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Anyone can view xp" ON xp_events FOR SELECT USING (true);
CREATE POLICY "Users log own xp" ON xp_events FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users view own progress" ON user_progress FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);
CREATE POLICY "Users manage own progress" ON user_progress FOR ALL USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Anyone can view badges" ON badges_earned FOR SELECT USING (true);
CREATE POLICY "Users earn own badges" ON badges_earned FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);
