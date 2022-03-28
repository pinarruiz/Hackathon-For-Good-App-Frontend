/* eslint-disable no-console */
import 'dotenv/config'
import boxen from 'boxen';
import envConfig from '../config/envConfig.js';
import packageInfo from '../../package.json' assert {type: "json"};

const version = `Build version: ${packageInfo.version || 'Not found'}`;
const commitSHA = `Commit SHA: ${process.env.CI_COMMIT_SHORT_SHA || 'Not found'}`;
const backAddress = `Backend Address: ${envConfig.backAddress}`

const elements = [
  version,
  commitSHA,
  backAddress,
];

console.log(
  boxen(elements.join('\n'), {
    title: 'Build config summary',
    titleAlignment: 'center',
    padding: 1,
    textAlignment: 'center',
    borderColor: 'cyan',
    float: 'center',
  })
);