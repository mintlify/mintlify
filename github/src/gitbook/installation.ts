import { Probot } from 'probot';
import axios from 'axios';

import { ENDPOINT } from "../constants";

type GitbookFile = {
  filename: string;
  content: string;
}

const gitbookFilesToTrees = (gitbookFiles: GitbookFile[]) => {
  return gitbookFiles.map((gbFile) => {
    return {
      path: gbFile.filename,
      mode: '100644',
      type: 'blob',
      content: gbFile.content
    };
  });
};

const installation = async (context: any, repo: string) => {
    const owner = context.payload.installation.account.login;
    const integrationsResponse = await axios.get(`${ENDPOINT}/v01/integrations`, {
      data: {
        owner
      }
    });
    const { gitbook } = integrationsResponse?.data;
    if (gitbook) {
      const repoResponse = await context.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo
      });
      const defaultBranch = repoResponse.data.default_branch;
      const contentResponse = await context.octokit.git.getTree({
        owner,
        repo,
        tree_sha: defaultBranch,
        recursive: true
      })
      const { tree } = contentResponse.data;
      const fileContentPromises = tree.map((file: any) => new Promise(async (resolve, reject) => {
        try {
          const contentRequest = {
            owner,
            repo,
            path: file.path 
          };
          const content = await context.octokit.repos.getContent(contentRequest) as { data: { content: string } };
          const contentString = Buffer.from(content.data.content, 'base64').toString();
          resolve({
            filename: file.path,
            content: contentString
          });
        } catch (e) {
          reject(e);
        }
      }));
      const files = await Promise.all(fileContentPromises);
      const gitbookFileResponse = await axios.post(`${ENDPOINT}/gitbook/`, {
        files,
        owner,
      });
      const gitbookFiles = gitbookFileResponse.data.mdFiles as GitbookFile[];
      const treeChildren = gitbookFilesToTrees(gitbookFiles);
      const refResponse = await context.octokit.rest.git.getRef({
        owner,
        repo,
        ref: `heads/${defaultBranch}`
      });
      const baseSha = refResponse.data.object.sha;
      const createdTreeResponse = await context.octokit.rest.git.createTree({
        owner,
        repo,
        tree: treeChildren,
        base_tree: baseSha
      });
      const treeSha = createdTreeResponse.data.sha;
      const commitResponse = await context.octokit.rest.git.createCommit({
        owner,
        repo,
        message: 'Initial docs generated',
        tree: treeSha,
        parents: [baseSha]
      });
      const commitSha = commitResponse.data.sha;
      await context.octokit.rest.git.updateRef({
        owner,
        repo,
        ref: `heads/${defaultBranch}`,
        sha: commitSha
      });
    }
}

export const gitbookInstallation = (app: Probot) => {
    app.on('installation.created', async (context) => {
        const repo = context.payload.repositories[0]?.name;
        await installation(context, repo);
    });
    app.on('installation_repositories.added', async (context) => {
        const repo = context.payload.repositories_added[0]?.name;
        await installation(context, repo);
    });
}