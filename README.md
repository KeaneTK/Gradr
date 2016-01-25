### For the marker:
    - Our Trello page for iteration 1 (task tracking): https://trello.com/b/mpbIdgMg/iteration-1

### Getting started and setting up the dev environment:
I'm going to be using a VM and it's recommended that everyone working on the project should, so that we all use the same environment

- To ease the process of creating and maintaining a virtual machine, I highly recommend [Vagrant](https://www.vagrantup.com/)
    - Vagrant uses VirtualBox to quickly set up and tear down virtual machines, and by including the `Vagrantfile` in the repo, we can all use the exact same configuration
    - Vagrant is cross-platform
    - Install Vagrant from the link above (you'll also need VirtualBox, but I believe the Vagrant installer handles that)
- Once you've installed vagrant, `cd` into your local version of the repo
- Run `vagrant up`
- Once that's done, run `vagrant ssh`
    - BAM! You've SSH'd into your VM
- `cd` into `/vagrant`
    - This is a shared folder, basically it is mirroring the folder that the Vagrantfile is located in on your local machine, which also happens to be the repository
- run `./get_started`
    - you may have to modify the permissions on this file; if it doesn't run, try `chmod +x ./get_started && ./get_started`
- Node.js and all dependencies should now be installed. If you run into any issues, talk to Matt and he can probably walk you through it.

### Working on a new feature (using the command line):
- Make sure you have pulled the latest changes from the current iteration branch
- If your local copy is all up to date, create and checkout a new branch:
    - `git checkout -b name_of_new_feature`
- Commit your changes as you go, making sure to be descriptive
  - `git commit -m "Added a button to create a new image"`
  - _Note_: You can make breaking changes in feature branches, having more history is better!
- After you've made a few commits, be sure to push your changes to the remote
  - `git push`
  - Sometimes git will yell at you because it doesn't know where you want to push the changes, in this case, it usually shows you how to set the remote
    - e.g., `git --set-upstream origin/my-feature-branch`
- When you are finished working on a feature, it's time to create a pull request:
  - Go to the GitHub page for the project, find your branch, and click the "Create pull request" button
  - If you think everything looks good, submit the pull request
  - At *least* one other person should look through your code
    - If they think everything looks good, they are free to merge!
    - Sometimes auto-merging is possible. Other times, you're not so lucky. See the section "Fixing Merge Conflicts"
    
    
### Fixing Merge Conflicts
Sometimes, when trying to merge your feature back into the iteration branch, you will run into merge conflicts.

- switch to your feature branch that cannot be auto-merged from the pull request
- create a new temporary branch in case all hell breaks loose (if things get really messed up, you can just delete the temporary branch and try again)
  - e.g., `git checkout -b temp_merging_branch`
- merge the iteration branch into the temporary branch
  - e.g., `git merge iteration0`
  - you will be warned that there are conflicts to be resolved and a give list of any files with conflicts
    - go fix the conflicts, committing the changes as you go
  - once all conflicts are fixed and changes are committed, you're ready to merge the temporary branch back into the feature branch
    - `git checkout my-feature-branch`
    - `git merge temp_merging_branch`
    - This should go smoothly, as you're essentially only applying the resolved merge conflicts
  - Now that your feature branch is all up-to-date, merge it into the iteration branch
    - `git checkout iteration0`
    - `git merge my-feature-branch`
  - Check that everything looks good and delete the temporary merging branch
    - `git branch -D temp_merging_branch`
    
All of this seems like a lot of work, but it will keep the merge history looking pretty good and will reduce headaches when there are many conflicts to resolve.
    
