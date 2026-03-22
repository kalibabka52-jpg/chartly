import { supabase } from './supabase'

export async function completeLesson(
  userId: string,
  courseSlug: string,
  lessonSlug: string,
  xpReward: number
) {
  // Mark lesson as completed
  const { error: progressError } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
      completed: true,
      completed_at: new Date().toISOString(),
    })

  if (progressError) throw progressError

  // Log XP event
  const { error: xpError } = await supabase
    .from('xp_events')
    .insert({
      user_id: userId,
      amount: xpReward,
      source: 'lesson',
      source_id: `${courseSlug}/${lessonSlug}`,
    })

  if (xpError) throw xpError

  // Update total XP
  const { data: stats } = await supabase
    .from('user_stats')
    .select('total_xp, level')
    .eq('user_id', userId)
    .single()

  if (stats) {
    const newXp = stats.total_xp + xpReward
    const newLevel = Math.floor(newXp / 500) + 1

    await supabase
      .from('user_stats')
      .update({
        total_xp: newXp,
        level: newLevel,
        last_active: new Date().toISOString(),
      })
      .eq('user_id', userId)
  }

  return { xpEarned: xpReward }
}

export async function getUserProgress(userId: string, courseSlug: string) {
  const { data } = await supabase
    .from('user_progress')
    .select('lesson_slug, completed')
    .eq('user_id', userId)
    .eq('course_slug', courseSlug)

  return data ?? []
}

export async function getLeaderboard(limit = 20) {
  const { data } = await supabase
    .from('user_stats')
    .select('user_id, display_name, total_xp, level, streak_days')
    .order('total_xp', { ascending: false })
    .limit(limit)

  return data ?? []
}

export async function getUserStats(userId: string) {
  const { data } = await supabase
    .from('user_stats')
    .select('*')
    .eq('user_id', userId)
    .single()

  return data
}

export async function ensureUserStats(userId: string, displayName: string) {
  const { data: existing } = await supabase
    .from('user_stats')
    .select('user_id')
    .eq('user_id', userId)
    .single()

  if (!existing) {
    await supabase
      .from('user_stats')
      .insert({
        user_id: userId,
        display_name: displayName,
      })
  }
}
