# Reset Database - Complete Guide

## Step-by-Step Instructions

### Step 1: Clean Up Existing Database
1. Open **Supabase SQL Editor**
2. Open `database_cleanup.sql` from this project
3. Copy **ALL** contents
4. Paste into Supabase SQL Editor
5. Click **Run**
6. You should see: "Cleanup completed!"

### Step 2: Create Fresh Database
1. Still in Supabase SQL Editor
2. Open `database_setup.sql` from this project
3. Copy **ALL** contents
4. Paste into Supabase SQL Editor
5. Click **Run**
6. You should see: "✅ Database setup completed successfully!"

## What Gets Deleted

The cleanup script removes:
- ✅ All tables (profiles, courses, course_classes, enrollments, team_applications, notifications)
- ✅ All functions (handle_new_user, update_updated_at_column)
- ✅ All triggers (on_auth_user_created, update triggers)
- ✅ All indexes (automatically dropped with tables)
- ✅ All RLS policies (automatically dropped with tables)

## What Gets Created

The setup script creates:
- ✅ All tables with proper structure
- ✅ All indexes for performance
- ✅ All RLS policies (optimized)
- ✅ All functions (secure)
- ✅ All triggers
- ✅ Sample data (courses and classes)

## Important Notes

⚠️ **Warning**: This will delete ALL data in these tables:
- User profiles
- Courses and classes
- Enrollments
- Team applications
- Notifications

If you have important data, **back it up first** before running the cleanup script!

## Quick Reset (All-in-One)

If you want to do everything in one go, you can combine both scripts:

1. Copy contents of `database_cleanup.sql`
2. Paste into SQL Editor
3. Add a new line
4. Copy contents of `database_setup.sql`
5. Paste after the cleanup script
6. Run everything at once

## Troubleshooting

### If you get "relation does not exist" errors:
- This is normal if tables don't exist yet
- The cleanup script uses `IF EXISTS` so it's safe

### If you get permission errors:
- Make sure you're logged in as the project owner
- Check that you have the right permissions

### If cleanup doesn't work:
- Try dropping tables manually one by one
- Check for any dependencies first

