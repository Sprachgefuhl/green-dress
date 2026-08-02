const supabase = require('../config/supabase');
const LAST_SPOKE = new Date('2026-08-01T16:15:00').getTime();
const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getStreak = async () => {
  const { data, err } = await supabase
    .from('streak')
    .select('*')
    .eq('id', 1)
    .single()

  if (err) console.log(err.message);
  return data;
}

const updateStreak = async (current, high) => {
  const { data, err } = await supabase
    .from('streak')
    .update({ current: current, high: high })
    .eq('id', 1)
    .select()

  if (err) console.log(err.message);
  return data;
}

const handleStreak = async (current, high, dresses) => {
  const daysDiff = Math.floor((Date.now() - LAST_SPOKE) / MS_PER_DAY);

  // new high score
  if (daysDiff > high) return updateStreak(daysDiff, daysDiff);
  // new current score
  if (daysDiff > current) return updateStreak(daysDiff, high);
  return [{ current, high, dresses }];
};

const updateDresses = async (total) => {
  const { data } = await supabase
    .from('streak')
    .select('dresses')
    .eq('id', 1)
    .single();

  const { err } = await supabase
    .from('streak')
    .update({ dresses: data.dresses + total })
    .eq('id', 1)

  if (err) console.log(err.message);
}

module.exports = { getStreak, handleStreak, updateDresses }