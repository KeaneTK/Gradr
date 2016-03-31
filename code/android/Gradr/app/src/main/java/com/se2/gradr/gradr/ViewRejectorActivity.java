package com.se2.gradr.gradr;

import android.support.design.widget.TabLayout;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.view.MenuItem;

import com.se2.gradr.gradr.fragments.ViewMatchFragment;

public class ViewRejectorActivity extends ViewStudentActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
        tabLayout.setupWithViewPager(mViewPager);

    }

    //Executes calls when you click the toolbar
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();

        if (id == R.id.action_rejections) {
            //That's the page we just came from
            finish();
            return true;
            //We don't want to call super's version because it will open a new StudentListActivity instead of returning to the old one
        }

        return super.onOptionsItemSelected(item);
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            // getItem is called to instantiate the fragment for the given page.
            // Return a PlaceholderFragment (defined as a static inner class below).
            switch (position) {
                case 0:
                    ViewMatchFragment vmf = ViewMatchFragment.newInstance(userId, username, currStudent.getUser());
                    return vmf;
                default:
                    return ViewStudentActivity.PlaceholderFragment.newInstance(position + 1);
            }

        }

        @Override
        public int getCount() {
            // Can only see their profile.
            return 1;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return "YOU MAY ONLY VIEW REJECTOR PROFILES, NO RATING OR CHATTING";
        }
    }
}
