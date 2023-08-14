# React application

- Ensure that the build output is in the `build` directory. To ensure this, **do not modify** the build script in `package.json`.
- Place the code in the root of the repository i.e, the `package.json` should be in the root of the repository.
- Once the code is pushed to the `main` branch, the GitHub workflow will run the CICD pipeline and deploy the code to Cloud Run.
- To view the URL of the deployed service,
    - Click on the `Actions` tab
    - Click on the latest `Workflow`
    - Click on the first *Job* on the left
    - Expand the `Deploy` step of the pipeline and scroll to the bottom of the output to find the `Service URL`# Smart-bookmark
