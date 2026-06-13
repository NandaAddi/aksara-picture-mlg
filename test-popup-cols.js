const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://rgeshbeiweqnnkbhgoya.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnZXNoYmVpd2Vxbm5rYmhnb3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc2MzcxMTgsImV4cCI6MjA4MzIxMzExOH0.6N7jBP4C0KwHxYA8ymRT1UbN9kTyyQ2O3WV2Umvcdz4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('popups')
    .select('*')
    .limit(1);
  
  console.log('QueryResult:', data, error);
}
check();
