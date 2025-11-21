# Newsroom Automation Environment Setup

The `newsroom-automation` GitHub Actions workflow enforces a manual approval gate by targeting a GitHub **Environment** named `newsroom-automation`. Repository admins must configure this environment once so the workflow can pause for review and so alerts go to the right people.

## Steps

1. Open `https://github.com/Gusmack1/Charlesmackaybooks/settings/environments`.
2. Click **New environment**, enter `newsroom-automation`, and save (or select it if it already exists).
3. Under **Protection rules**, toggle **Required reviewers** and add the GitHub usernames that should approve daily newsroom runs (e.g., `Gusmack1`, `charles-mackay-ops`). You can add up to six reviewers; only one needs to approve each run.
4. (Optional) Add required wait timers or branch restrictions if certain branches should bypass the environment.
5. Under **Environment secrets**, add any keys the newsroom workflow might need later (for example, future ingestion proxies). These secrets are accessible only to jobs that explicitly target the environment.

Once saved, every time `.github/workflows/newsroom-automation.yml` reaches the `notify` job, GitHub will request approval from the configured reviewers before revealing artifacts or posting the run summary. If no reviewer responds, the job remains pending and the automation does not mark success, ensuring we always review newsroom output before publication.

