#!/usr/bin/env ts-node

import fs from 'fs-extra';
import shell from 'shelljs';
import { dir_root } from '../root.js';

const { copySync, ensureDirSync, pathExistsSync, writeFileSync } = fs;
const { exec, mkdir, mv } = shell;
const r = dir_root;

run();

async function run() {
  prepare_environment();
  backup_git();
  compile();
  copy_requirements();
  await edit_config();

  console.info(`
  Remember to put .env file in your build directory in production environment.
`);
}

function prepare_environment() {
  process.env.NODE_ENV = 'production';
}

function compile() {
  ensureDirSync(b());
  exec(`rm -fr ${b('*')}`);
  exec(`npx tsc`);
}

function copy_requirements() {
  copySync(r('readme.md'), b('readme.md'));
  copySync(r('bin'), b('bin'));
}

async function edit_config() {
  const json = (await import(r('./package.json'), { assert: { type: 'json' } })).default;
  delete json.files;
  json.main = 'index.js';
  json.type = 'index.d.ts';
  writeFileSync(dir_root('build/package.json'), JSON.stringify(json), () => {});
}

function backup_git() {
  const tmp_path = r('tmp');
  const git_path = b('.git');
  const git_backup_path = `${tmp_path}/.git_tmp_backup`;

  if (pathExistsSync(git_path)) {
    mkdir('-p', tmp_path);
    mv(git_path, git_backup_path);
    mv(git_backup_path, git_path);
    copySync(r('.gitignore'), b('.gitignore'));
  }
}

/**
 * dir_build
 * @param args
 * @returns {string}
 */
function b(...args) {
  return r('build', ...args);
}
