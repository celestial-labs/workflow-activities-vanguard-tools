## Register an Activity Pack

```https://unpkg.com/workflow-activities-vanguard-tools/build/activitypack.json```

1. Log in to ArcGIS Online or ArcGIS Enterprise.
2. Navigate to **My Content** and choose **Add Item > An application**.
3. For the new item, specify the following details:
   - Type: `Web Mapping`
   - Purpose: `Ready To Use`
   - API: `JavaScript`
   - URL: Enter the URL for the activity pack manifest. For the latest version, use `https://unpkg.com/workflow-activities-vanguard-tools/build/activitypack.json`.
   - Title: Choose a relevant title for the activity pack.
   - Tags: Include the tag `geocortex-workflow-activity-pack`.
4. Save the new item, and if necessary, share it with your organization or specific groups for internal use.
5. Refresh the VertiGIS Studio Workflow Designer to see the Activity Pack.

### Share the Activity Pack

- Share the item with the activity pack only with workflow authors within your organization.
- End users running the workflow do not need access to the activity pack item itself.
- The Workflow Designer will load activity packs from users within your organization. To use a pack from another organization, create an item pointing to it.

### Use the Activities

- After registration, the activities from the activity pack will be available in the VertiGIS Studio Workflow Designer.
- Begin adding the activities to your workflows as needed.
