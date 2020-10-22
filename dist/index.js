#!/usr/bin/env node
const shell = require('shelljs');

const commitMsg = process.env.HUSKY_GIT_PARAMS.split(' ')[0];

const getBranchName = () =>
  shell
    .exec('git branch')
    .grep('[*]')
    .sed('[*]', '')
    .sed('^.*/', '')
    .trim();

const addBranchNumber = () => {
  const branch = getBranchName();

  const description = shell.exec(`git config branch."${branch}".description`)
    .stdout;

  shell
    .echo('-n', `${branch} | `)
    .cat(commitMsg)
    .to(commitMsg);

  if (description.length > 0) {
    shell.echo('-n', '').toEnd(commitMsg);
    shell.echo('-n', description).toEnd(commitMsg);
  }
};

if (!shell.cat(commitMsg).stdout.includes('Merge')) {
  addBranchNumber();
}

